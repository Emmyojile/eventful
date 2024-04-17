"use client"

import React from "react";

export default function Donate() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-xl p-6 bg-white rounded-lg shadow-md flex">
        <div className="w-1/2 pr-6">
          <img
            className="w-full h-auto rounded"
            src="https://fossil.scene7.com/is/image/FossilPartners/FS6029_main?$sfcc_fos_medium$"
            alt="Watch Image"
          />
        </div>
        <div className="w-1/2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Donate for a Limited Edition Watch
          </h2>
          <p className="text-gray-600 mb-4">
            Help us make a difference with your generous donation. Every
            contribution brings us closer to our goal.
          </p>
          <div className="mb-4">
            <label
              htmlFor="donationAmount"
              className="block text-sm font-medium text-gray-600"
            >
              Donation Amount
            </label>
            <input
              id="donationAmount"
              name="donationAmount"
              type="number"
              className="mt-1 p-3 border border-gray-300 rounded w-full"
              placeholder="Enter amount to donate"
            />
          </div>
          <button className="w-full p-3 bg-green-700 text-white rounded hover:bg-green-600">
            Donate Now
          </button>
        </div>
      </div>
    </div>
  );
}
