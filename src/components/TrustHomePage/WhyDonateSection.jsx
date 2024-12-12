import React, { useEffect, useState } from "react";

function WhyDonateSection() {
    const [totalDonations, setTotalDonations] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTotalDonations((prev) => prev + Math.floor(Math.random() * 10000)); // จำลองการเพิ่มยอดบริจาค
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div id="why-donate" className="relative bg-gradient-to-br from-green-400 via-green-500 to-green-700 text-white py-20 px-8">
            {/* Decorative Background Circle */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-200 to-green-500 blur-3xl opacity-30 rounded-full -z-10"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-green-300 to-green-600 blur-3xl opacity-30 rounded-full -z-10"></div>

            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <h2 className="text-5xl md:text-4xl font-extrabold text-center">
                    Why Donate with Us?
                </h2>
                <div className="flex justify-center">
                    <img src="/assets/handboxdonate.gif" alt="handboxdonate" className="w-[200px]" />
                </div>


                <p className="text-center mt-6 text-xl md:text-2xl leading-relaxed">
                    Join us in making a difference! Every contribution drives meaningful change in communities and the environment.
                </p>

                {/* Features Grid */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {/* Feature 1 */}
                    <div className="bg-white bg-opacity-10 p-8 rounded-2xl shadow-lg backdrop-blur-md transform hover:scale-105 transition-transform duration-300">
                        <h3 className="text-3xl font-semibold mb-6">🌍 Transparency</h3>
                        <p className="text-lg leading-relaxed">
                            Track your donations with detailed and transparent reports updated regularly.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white bg-opacity-10 p-8 rounded-2xl shadow-lg backdrop-blur-md transform hover:scale-105 transition-transform duration-300">
                        <h3 className="text-3xl font-semibold mb-6">🌱 Tangible Impact</h3>
                        <p className="text-lg leading-relaxed">
                            Witness real results: trees planted, meals served, and communities uplifted.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white bg-opacity-10 p-8 rounded-2xl shadow-lg backdrop-blur-md transform hover:scale-105 transition-transform duration-300">
                        <h3 className="text-3xl font-semibold mb-6">🤝 Empower Participation</h3>
                        <p className="text-lg leading-relaxed">
                            Be part of a global movement. Together, we can create lasting change for a better tomorrow.
                        </p>
                    </div>
                </div>

                {/* Gift Box Section */}
                <div id="rewardtier" className="mt-20">
                    <h2 className="text-5xl md:text-4xl font-extrabold text-center">
                        🎁 Reward Boxes for Every Donation
                    </h2>
                    <p className="text-center mt-6 text-xl md:text-2xl leading-relaxed">
                        Your donations make an impact, and we make it rewarding! Unlock an eco-friendly gift based on your donation amount. Each reward comes from a surprise gift box, tailored to the tier of your donation. The higher you donate, the more exclusive your rewards!
                    </p>

                    {/* Gift Levels */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
                        {/* Tier 1 */}
                        <div className="bg-white bg-opacity-10 p-8 rounded-2xl shadow-lg backdrop-blur-md transform hover:scale-105 transition-transform duration-300">
                            <img
                                src="https://img.freepik.com/free-vector/various-reusable-eco-bags-bottles-set_74855-7922.jpg"
                                alt="10 THB Gift"
                                className="w-24 h-24 mx-auto mb-6"
                            />
                            <h3 className="text-3xl font-semibold mb-4">10 THB</h3>
                            <p className="text-lg leading-relaxed">Eco stickers or reusable straw sleeves.</p>
                        </div>

                        {/* Tier 2 */}
                        <div className="bg-white bg-opacity-10 p-8 rounded-2xl shadow-lg backdrop-blur-md transform hover:scale-105 transition-transform duration-300">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSemUuQnNfUfE2qHCqGqTk5UUcnt_mf3FbDzg&s"
                                alt="100 THB Gift"
                                className="w-24 h-24 mx-auto mb-6"
                            />
                            <h3 className="text-3xl font-semibold mb-4">100 THB</h3>
                            <p className="text-lg leading-relaxed">Eco bags, notebooks, or reusable tumblers.</p>
                        </div>

                        {/* Tier 3 */}
                        <div className="bg-white bg-opacity-10 p-8 rounded-2xl shadow-lg backdrop-blur-md transform hover:scale-105 transition-transform duration-300">
                            <img
                                src="https://cf.shopee.co.th/file/th-11134207-7r990-lxqihqkw5wi72a"
                                alt="1,000 THB Gift"
                                className="w-24 h-24 mx-auto mb-6"
                            />
                            <h3 className="text-3xl font-semibold mb-4">1,000 THB</h3>
                            <p className="text-lg leading-relaxed">Premium items like solar-powered power bank.</p>
                        </div>

                        {/* Tier 4 */}
                        <div className="bg-white bg-opacity-10 p-8 rounded-2xl shadow-lg backdrop-blur-md transform hover:scale-105 transition-transform duration-300">
                            <img
                                src="https://hips.hearstapps.com/hmg-prod/images/cannondale-adventure-neo-ebike-034-66ccd3f6b8f43.jpg?crop=0.770xw:0.824xh;0.131xw,0.106xh&resize=980:*"
                                alt="10,000 THB Gift"
                                className="w-24 h-24 mx-auto mb-6"
                            />
                            <h3 className="text-3xl font-semibold mb-4">10,000 THB</h3>
                            <p className="text-lg leading-relaxed">Exclusive solar panel kits or electric bicycles.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Real-Time Donations */}
            <h3 className="text-4xl font-bold mt-20 text-center text-white">
                💸 Total Donations
            </h3>
            <p className="text-6xl font-extrabold text-center text-green-100 mt-4">
                {totalDonations.toLocaleString()} THB
            </p>

            {/* Footer */}
            <div className="mt-20 text-center opacity-90 text-base">
                <p>© 2024 Eco Pandora Box | Your contributions make a difference.</p>
            </div>
        </div>
    );
}

export default WhyDonateSection;
