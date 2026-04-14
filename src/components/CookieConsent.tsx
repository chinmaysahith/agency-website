"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getConsent,
  setConsent,
  revokeConsent,
  initConsentScripts,
} from "@/lib/cookieConsent";
import { Shield, Cookie, ChevronDown, ChevronUp, X } from "lucide-react";
import Link from "next/link";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    // Re-fire any consented scripts from a prior session
    initConsentScripts();

    // Show banner only if no consent recorded
    const consent = getConsent();
    if (!consent) {
      // Small delay so page content loads first
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen for external "open cookie settings" events (e.g. footer link)
  useEffect(() => {
    const handler = () => {
      const consent = getConsent();
      if (consent) {
        setAnalytics(consent.analytics);
        setMarketing(consent.marketing);
      }
      setVisible(true);
      setShowPrefs(true);
    };
    window.addEventListener("open-cookie-settings", handler);
    return () => window.removeEventListener("open-cookie-settings", handler);
  }, []);

  const acceptAll = useCallback(() => {
    setConsent({ analytics: true, marketing: true });
    setVisible(false);
    setShowPrefs(false);
  }, []);

  const rejectNonEssential = useCallback(() => {
    setConsent({ analytics: false, marketing: false });
    setVisible(false);
    setShowPrefs(false);
  }, []);

  const savePreferences = useCallback(() => {
    setConsent({ analytics, marketing });
    setVisible(false);
    setShowPrefs(false);
  }, [analytics, marketing]);

  const handleRevoke = useCallback(() => {
    revokeConsent();
    setAnalytics(false);
    setMarketing(false);
    setVisible(true);
    setShowPrefs(false);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] bg-black/20 backdrop-blur-[2px]"
            onClick={rejectNonEssential}
            aria-hidden="true"
          />

          {/* Banner */}
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            role="dialog"
            aria-label="Cookie consent"
            aria-modal="true"
            id="cookie-consent-banner"
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-[440px] z-[9999] rounded-2xl border border-gray-200 bg-white/95 backdrop-blur-xl shadow-2xl shadow-black/10"
          >
            {/* Close button */}
            <button
              onClick={rejectNonEssential}
              className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
              aria-label="Close cookie banner"
            >
              <X size={16} />
            </button>

            <div className="p-5 pb-4">
              {/* Header */}
              <div className="flex items-center gap-2.5 mb-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-50 text-blue-600">
                  <Cookie size={18} />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-gray-900 leading-tight">
                    We value your privacy
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-[13px] leading-relaxed text-gray-500 mb-4">
                We use cookies to enhance your browsing experience and analyze
                site traffic. You can choose which cookies to allow below.{" "}
                <Link
                  href="/cookie-policy"
                  className="text-blue-600 hover:text-blue-700 underline underline-offset-2"
                >
                  Learn more
                </Link>
              </p>

              {/* Preferences Toggle */}
              <button
                onClick={() => setShowPrefs(!showPrefs)}
                className="flex items-center gap-1.5 text-[13px] font-medium text-gray-600 hover:text-gray-900 transition-colors mb-4"
                aria-expanded={showPrefs}
                aria-controls="cookie-preferences"
              >
                <Shield size={14} />
                Manage preferences
                {showPrefs ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>

              {/* Preferences Panel */}
              <AnimatePresence>
                {showPrefs && (
                  <motion.div
                    id="cookie-preferences"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-3 mb-4 pb-4 border-b border-gray-100">
                      {/* Necessary */}
                      <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-gray-50">
                        <div>
                          <p className="text-[13px] font-medium text-gray-800">
                            Necessary
                          </p>
                          <p className="text-[11px] text-gray-400">
                            Required for the site to function
                          </p>
                        </div>
                        <div className="relative w-10 h-[22px] rounded-full bg-blue-500 cursor-not-allowed opacity-70">
                          <div className="absolute top-[3px] right-[3px] w-4 h-4 rounded-full bg-white shadow-sm" />
                        </div>
                      </div>

                      {/* Analytics */}
                      <label className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                        <div>
                          <p className="text-[13px] font-medium text-gray-800">
                            Analytics
                          </p>
                          <p className="text-[11px] text-gray-400">
                            Help us understand how visitors use the site
                          </p>
                        </div>
                        <button
                          role="switch"
                          aria-checked={analytics}
                          onClick={() => setAnalytics(!analytics)}
                          className={`relative w-10 h-[22px] rounded-full transition-colors duration-200 ${
                            analytics ? "bg-blue-500" : "bg-gray-300"
                          }`}
                        >
                          <div
                            className={`absolute top-[3px] w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                              analytics
                                ? "translate-x-[21px]"
                                : "translate-x-[3px]"
                            }`}
                          />
                        </button>
                      </label>

                      {/* Marketing */}
                      <label className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                        <div>
                          <p className="text-[13px] font-medium text-gray-800">
                            Marketing
                          </p>
                          <p className="text-[11px] text-gray-400">
                            Used for targeted ads and retargeting
                          </p>
                        </div>
                        <button
                          role="switch"
                          aria-checked={marketing}
                          onClick={() => setMarketing(!marketing)}
                          className={`relative w-10 h-[22px] rounded-full transition-colors duration-200 ${
                            marketing ? "bg-blue-500" : "bg-gray-300"
                          }`}
                        >
                          <div
                            className={`absolute top-[3px] w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                              marketing
                                ? "translate-x-[21px]"
                                : "translate-x-[3px]"
                            }`}
                          />
                        </button>
                      </label>
                    </div>

                    {/* Save Preferences */}
                    <button
                      onClick={savePreferences}
                      id="cookie-save-preferences"
                      className="w-full py-2.5 rounded-xl text-[13px] font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors mb-3"
                    >
                      Save preferences
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex gap-2.5">
                <button
                  onClick={rejectNonEssential}
                  id="cookie-reject"
                  className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all duration-200"
                >
                  Reject all
                </button>
                <button
                  onClick={acceptAll}
                  id="cookie-accept-all"
                  className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all duration-200"
                >
                  Accept all
                </button>
              </div>
            </div>

            {/* Footer link */}
            <div className="border-t border-gray-100 px-5 py-2.5 flex items-center justify-center gap-4 text-[11px] text-gray-400">
              <Link
                href="/privacy-policy"
                className="hover:text-gray-600 transition-colors"
              >
                Privacy Policy
              </Link>
              <span>·</span>
              <Link
                href="/cookie-policy"
                className="hover:text-gray-600 transition-colors"
              >
                Cookie Policy
              </Link>
              <span>·</span>
              <button
                onClick={handleRevoke}
                className="hover:text-gray-600 transition-colors"
              >
                Reset consent
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
