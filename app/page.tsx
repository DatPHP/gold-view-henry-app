"use client";

import { useWorldGold, useGoldSJC, useGoldRing } from "@/hooks/useGold";

export default function Home() {

  const { data: world } = useWorldGold();
  const { data: sjc } = useGoldSJC();
  const { data: ring } = useGoldRing();

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-10">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-yellow-400">
          Gold Price Dashboard
        </h1>

        <div className="flex items-center gap-2 text-sm text-green-400">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          Live
        </div>
      </div>


      {/* GRID */}

      <div className="grid md:grid-cols-3 gap-6">


        {/* WORLD GOLD */}

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow hover:border-yellow-500 transition">

          <h2 className="text-sm text-gray-400 mb-2 flex items-center gap-2">
            🌍 WORLD GOLD
          </h2>

          {world ? (
            <>
              <p className="text-4xl font-bold text-yellow-400">
                ${world.price?.toLocaleString()}
              </p>

              <p className="text-gray-500 text-sm mt-1">
                {world.currency}
              </p>
            </>
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}

        </div>



        {/* SJC GOLD */}

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow hover:border-yellow-500 transition">

          <h2 className="text-sm text-gray-400 mb-4 flex items-center gap-2">
            🇻🇳 VN SJC GOLD
          </h2>

          {sjc ? (
            <div className="space-y-3">

              <div className="flex justify-between items-center">
                <span className="text-gray-400">Buy</span>
                <span className="text-green-400 text-lg font-semibold">
                  {sjc.buy?.toLocaleString()} VND
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400">Sell</span>
                <span className="text-red-400 text-lg font-semibold">
                  {sjc.sell?.toLocaleString()} VND
                </span>
              </div>

            </div>
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}

        </div>



        {/* GOLD RING */}

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow hover:border-yellow-500 transition">

          <h2 className="text-sm text-gray-400 mb-4 flex items-center gap-2">
            🇻🇳 VN GOLD RING 9999
          </h2>

          {ring ? (
            <div className="space-y-3">

              <div className="flex justify-between items-center">
                <span className="text-gray-400">Buy</span>
                <span className="text-green-400 text-lg font-semibold">
                  {ring.buy?.toLocaleString()} VND
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400">Sell</span>
                <span className="text-red-400 text-lg font-semibold">
                  {ring.sell?.toLocaleString()} VND
                </span>
              </div>

            </div>
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}

        </div>


      </div>

    </main>
  );
}