import Wishlist from "../models/WishlistModel.js";
import Users from "../models/UserModel.js";
import Products from "../models/ProductModel.js";
import { sendWishlistDataToClient } from "../sockets/ConfigureSocket.js";
import Pusher from "pusher";

export const getWishlist = async (req, res) => {
    const wishlists = await Wishlist.findAll({
        attributes: ["id", "uuidUser", "idProduct", "name", "image", "url", "price", "category", "information"],
        where: {
            uuidUser: req.params.uuidUser
        }
    });

    return res.status(200).json(wishlists);
}

export const addWishlist = async (req, res) => {
    const users = await Users.findOne({
        where: {
            uuid: req.body.uuidUser
        }
    });
    if (!users) return res.status(401).json({ message: "users tidak terdaftar" });

    const products = await Products.findOne({
        where: {
            id: req.body.idProduct
        }
    });
    if (!products) return res.status(401).json({ message: "tidak memiliki product tersebut" });

    const wishlists = await Wishlist.findAll({
        where: {
            uuidUser: req.body.uuidUser
        }
    });
    const filterWishlists = wishlists.filter((data) => {
        return data.idProduct === req.body.idProduct
    });
    if (filterWishlists.length !== 0) return res.status(401).json({ message: "product sudah ada di daftar wishlist" });

    try {
        await Wishlist.create({
            uuidUser: req.body.uuidUser,
            idProduct: products.id,
            name: products.name,
            image: products.image,
            amount: products.amount,
            url: products.url,
            price: products.price,
            category: products.category,
            information: products.information,
        });

        // await sendWishlistDataToClient(req.body.uuidUser);

        const pusher = new Pusher({
            appId: "1863778",
            key: "219991e5be6e2d274d39",
            secret: "711b95e10105e50e8f14",
            cluster: "ap1", // Contoh: 'ap1'
            useTLS: true,
        });

        const wishlists = await Wishlist.findAll({
            where: {
                uuidUser: uuidUsers
            }
        });
        console.log({ pusher: wishlists })

        // Kirim event ke Pusher dan tambahkan logging dengan then/catch
        pusher.trigger(
            "my-channel",
            "my-event",
            { message: "Test event from Vercel" }
            // wishlists
        )
            .then(() => {
                console.log('Event sent to Pusher successfully'); // Log sukses
            })
            .catch(error => {
                console.error('Error sending event to Pusher:', error); // Log error
            });

        return res.status(200).json({ message: "success add wishlist" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export const removeWishlist = async (req, res) => {
    const wishlists = await Wishlist.findAll({
        where: {
            id: req.params.id
        }
    });

    if (wishlists.length === 0) return res.status(401).json({ message: "product tidak ada di daftar wishlist" });

    try {
        await Wishlist.destroy({ where: { id: req.params.id } });

        await sendWishlistDataToClient(wishlists[0].uuidUser);
        return res.status(200).json({ message: "success remove wishlist" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}