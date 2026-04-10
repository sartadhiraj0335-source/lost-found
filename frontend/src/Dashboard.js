import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL?.replace(/\/$/, "");

function Dashboard() {
    const [items, setItems] = useState([]);

    const [form, setForm] = useState({
        title: "",
        description: "",
        location: "",
        image: null
    });

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/items`);
            setItems(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/api/items/${id}`);
            fetchItems();
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("location", form.location);
        formData.append("image", form.image);

        try {
            await axios.post(`${BASE_URL}/api/items`, formData);
            fetchItems();

            setForm({
                title: "",
                description: "",
                location: "",
                image: null
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 relative overflow-hidden">

            {/* Decorative Background */}
            <div className="absolute top-10 left-10 w-40 h-40 bg-pink-300 opacity-30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-52 h-52 bg-purple-300 opacity-30 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-blue-300 opacity-20 rounded-full blur-2xl"></div>

            {/* Navbar */}
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white p-4 shadow-lg flex justify-between items-center relative z-10">
                <h1 className="text-xl font-bold tracking-wide">
                    🌸 Lost & Found Portal
                </h1>
                <p className="text-sm">Welcome 👋</p>
            </div>

            {/* Header */}
            <div className="text-center mt-6 relative z-10">
                <h2 className="text-3xl font-bold text-gray-800">
                    Dashboard
                </h2>
                <p className="text-gray-600">Manage lost & found items easily</p>
            </div>

            {/* Form */}
            <div className="backdrop-blur-md bg-white/70 p-6 rounded-2xl shadow-xl max-w-md mx-auto mt-6 border border-white/40 relative z-10">
                <h3 className="text-lg font-semibold mb-4 text-purple-600">
                    Add New Item
                </h3>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-400 outline-none"
                    />

                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-400 outline-none"
                    />

                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={form.location}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-400 outline-none"
                    />

                    <input
                        type="file"
                        onChange={(e) =>
                            setForm({ ...form, image: e.target.files[0] })
                        }
                    />

                    <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white p-2 rounded-lg hover:scale-105 transition">
                        Add Item
                    </button>
                </form>
            </div>

            {/* Items Grid */}
            <div className="grid md:grid-cols-3 gap-6 p-6 relative z-10">
                {items.map((item) => (
                    <div
                        key={item._id}
                        className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md overflow-hidden hover:shadow-2xl hover:scale-105 transition"
                    >
                        {item.image && (
                            <img
                                src={`${BASE_URL}/uploads/${item.image}`}
                                className="w-full h-40 object-cover"
                                alt="item"
                            />
                        )}

                        <div className="p-4">
                            <h3 className="text-lg font-bold">{item.title}</h3>
                            <p className="text-gray-600">{item.description}</p>
                            <p className="text-sm text-gray-500 mt-1">
                                📍 {item.location}
                            </p>

                            <button
                                onClick={() => handleDelete(item._id)}
                                className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white text-center py-4 mt-6 relative z-10">
                <p className="text-sm">© 2026 Lost & Found Portal</p>
                <p className="text-xs mt-1">
                    Developed by <span className="font-semibold">Aditya Singh 🌸</span>
                </p>
            </div>

        </div>
    );
}

export default Dashboard;