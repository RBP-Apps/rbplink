"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, User, Shield, Award, Zap, CheckCircle, Star, AlertCircle, Users, ChevronDown } from "lucide-react"

export default function Component() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    reference: "",
    referenceName: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [mounted, setMounted] = useState(false)

  // Replace with your Google Apps Script URL
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyGQl7t00GUnhSDMkHvrVXq0NbiOxOx1wuECZiUv1-DsuzNNiJVsNkBeGlyOl-6b5Gr/exec"

  // Reference options
  const referenceOptions = [
    { value: "Facebook", label: "Facebook" },
    { value: "Instagram", label: "Instagram" },
    { value: "Newspaper", label: "Newspaper" },
    { value: "Any Person", label: "Any Person" },
    { value: "Other", label: "Other" },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  // JSONP function to bypass CORS
  const submitWithJSONP = (url, data) => {
    return new Promise((resolve, reject) => {
      const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random())

      // Create callback function
      window[callbackName] = function (response) {
        // Clean up
        document.head.removeChild(script)
        delete window[callbackName]
        resolve(response)
      }

      // Create script tag
      const script = document.createElement('script')
      const params = new URLSearchParams(data)
      params.append('callback', callbackName)
      script.src = url + '?' + params.toString()

      // Handle errors
      script.onerror = function () {
        document.head.removeChild(script)
        delete window[callbackName]
        reject(new Error('JSONP request failed'))
      }

      // Add script to head
      document.head.appendChild(script)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const result = await submitWithJSONP(GOOGLE_SCRIPT_URL, {
        name: formData.name,
        mobile: formData.mobile,
        reference: formData.reference,
        referenceName: formData.referenceName
      })

      if (result.success) {
        setIsSubmitted(true)
        console.log("Form submitted successfully:", formData)
        console.log("Server response:", result)
      } else {
        throw new Error(result.message || 'Failed to save data')
      }

    } catch (error) {
      console.error("Error submitting form:", error)
      setError("Failed to submit form. Please try again or contact support.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleReferenceChange = (value) => {
    setFormData({
      ...formData,
      reference: value,
      referenceName: "", // Clear reference name when reference changes
    })
  }

  // Check if reference name field should be shown
  const shouldShowReferenceName = formData.reference === "Any Person" || formData.reference === "Other"

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-100 flex items-center justify-center px-4 py-8">
        <div className="text-center animate-fade-in max-w-md w-full">
          <div className="relative mb-8">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto animate-bounce shadow-2xl">
              <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-ping"></div>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4">Thank You!</h2>
          <p className="text-gray-600 text-base sm:text-lg mb-6">Your details have been saved successfully. Our expert team will call you within 24 hours.</p>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-center space-x-2 text-teal-600">
              <Phone className="w-5 h-5" />
              <span className="font-semibold">Call incoming soon...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-100 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-20 left-20 sm:top-40 sm:left-40 w-40 h-40 sm:w-80 sm:h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-teal-400 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-3/4 left-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-float-delayed opacity-60"></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-emerald-400 rounded-full animate-float-slow opacity-60"></div>
      </div>

      <div className="relative z-10 py-6 sm:py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Header Section */}
          <div className="text-center mb-8 sm:mb-16 animate-fade-in-up">
            <div className="inline-block p-3 sm:p-6 bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 mb-6 sm:mb-8">
              <img src="/rbp-logo.png" alt="RBP Logo" className="h-12 sm:h-20 mx-auto" />
            </div>

            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
                Get Your Premium Solar Quote
              </h1>
              <p className="text-gray-600 text-base sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of satisfied customers with India's most trusted solar solutions
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 mb-8">
                <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-lg">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold text-gray-700">4.9/5 Rating</span>
                </div>
                <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-lg">
                  <Shield className="w-4 h-4 text-teal-500" />
                  <span className="text-sm font-semibold text-gray-700">ISO Certified</span>
                </div>
                <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-lg">
                  <Award className="w-4 h-4 text-teal-500" />
                  <span className="text-sm font-semibold text-gray-700">13+ Years</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Form Card */}
          <Card className="mb-8 sm:mb-16 shadow-2xl border-0 bg-white/90 backdrop-blur-lg hover:shadow-3xl transition-all duration-500 animate-fade-in-up animation-delay-200 max-w-2xl mx-auto">
            <CardContent className="p-6 sm:p-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Quick Quote Form</h2>
                {/* <p className="text-gray-600">Get personalized solar solution in 2 minutes</p> */}
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center space-x-2 text-red-700">
                  <AlertCircle className="w-5 h-5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                <div className="space-y-6">
                  {/* Name Input */}
                  <div className="group">
                    <Label
                      htmlFor="name"
                      className="text-sm font-semibold text-gray-700 mb-3 block transition-colors group-focus-within:text-teal-600 flex items-center space-x-2"
                    >
                      <User className="w-4 h-4" />
                      <span>Full Name *</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full h-14 sm:h-16 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all duration-300 text-base sm:text-lg pl-4 pr-4 hover:border-teal-300 bg-white/80"
                        placeholder="Enter your full name"
                        required
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 opacity-0 group-focus-within:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Mobile Input */}
                  <div className="group">
                    <Label
                      htmlFor="mobile"
                      className="text-sm font-semibold text-gray-700 mb-3 block transition-colors group-focus-within:text-teal-600 flex items-center space-x-2"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Mobile Number *</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        className="w-full h-14 sm:h-16 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all duration-300 text-base sm:text-lg pl-4 pr-4 hover:border-teal-300 bg-white/80"
                        placeholder="Enter your mobile number"
                        required
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 opacity-0 group-focus-within:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Enhanced Reference Dropdown */}
                  <div className="group">
                    <Label
                      htmlFor="reference"
                      className="text-sm font-semibold text-gray-700 mb-3 block transition-colors group-focus-within:text-teal-600 flex items-center space-x-2"
                    >
                      <Users className="w-4 h-4" />
                      <span>Reference *</span>
                    </Label>
                    <div className="relative">
                      <Select value={formData.reference} onValueChange={handleReferenceChange} required>
                        <SelectTrigger className="w-full h-14 sm:h-16 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all duration-300 text-base sm:text-lg pl-4 pr-4 hover:border-teal-300 bg-white/80 data-[state=open]:border-teal-500 data-[state=open]:ring-4 data-[state=open]:ring-teal-100 shadow-sm hover:shadow-md">
                          <SelectValue placeholder="Select how you heard about us" className="text-gray-500" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-2 border-gray-200 shadow-2xl bg-white/95 backdrop-blur-lg">
                          {referenceOptions.map((option) => (
                            <SelectItem 
                              key={option.value} 
                              value={option.value}
                              className="text-base sm:text-lg px-4 py-3 hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 hover:text-teal-700 focus:bg-gradient-to-r focus:from-teal-50 focus:to-cyan-50 focus:text-teal-700 cursor-pointer transition-all duration-200 rounded-xl mx-1"
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 opacity-0 group-focus-within:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Reference Name Input - Conditional */}
                  {shouldShowReferenceName && (
                    <div className="group animate-fade-in-up">
                      <Label
                        htmlFor="referenceName"
                        className="text-sm font-semibold text-gray-700 mb-3 block transition-colors group-focus-within:text-teal-600 flex items-center space-x-2"
                      >
                        <User className="w-4 h-4" />
                        <span>Name *</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="referenceName"
                          name="referenceName"
                          type="text"
                          value={formData.referenceName}
                          onChange={handleInputChange}
                          className="w-full h-14 sm:h-16 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all duration-300 text-base sm:text-lg pl-4 pr-4 hover:border-teal-300 bg-white/80"
                          placeholder={formData.reference === "Any Person" ? "Enter person's name" : "Enter details"}
                          required
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 opacity-0 group-focus-within:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-center pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white px-8 sm:px-16 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg h-auto shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-h-[60px] sm:min-h-[70px]"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Saving Your Details...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-3">
                        <span>Submit</span>
                      </div>
                    )}
                  </Button>

                  <div className="mt-6 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl border border-teal-100">
                    <p className="text-sm sm:text-base text-teal-700 font-semibold animate-pulse flex items-center justify-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>Our team will call you within 24 hours</span>
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Mobile-Optimized Comparison Table */}
          <Card className="mb-8 sm:mb-16 shadow-2xl border-0 bg-white/90 backdrop-blur-lg hover:shadow-3xl transition-all duration-500 animate-fade-in-up animation-delay-400">
            <CardContent className="p-4 sm:p-10">
              <div className="text-center mb-6 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-4">🔷 Why RBP is Superior</h2>
                <p className="text-gray-600 text-sm sm:text-base">Compare our premium features with competitors</p>
              </div>

              {/* Horizontally Scrollable Table for All Screen Sizes */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse rounded-2xl overflow-hidden shadow-2xl min-w-[700px]">
                  <thead>
                    <tr>
                      <th className="border-0 px-4 sm:px-6 py-3 sm:py-5 text-left font-bold text-gray-700 bg-gray-100 text-sm sm:text-lg min-w-[120px]">
                        System Category
                      </th>
                      <th className="border-0 px-4 sm:px-6 py-3 sm:py-5 text-center font-bold text-white bg-gradient-to-r from-teal-500 to-cyan-600 relative text-sm sm:text-lg min-w-[180px]">
                        <div className="absolute top-1 sm:top-2 right-1 sm:right-2">
                          <span className="bg-yellow-400 text-yellow-900 text-xs px-2 sm:px-3 py-1 rounded-full font-bold animate-pulse">
                            BEST CHOICE
                          </span>
                        </div>
                        Gold (RBP)
                      </th>
                      <th className="border-0 px-4 sm:px-6 py-3 sm:py-5 text-center font-bold text-gray-700 bg-yellow-100 text-sm sm:text-lg min-w-[140px]">
                        Gold Plated
                      </th>
                      <th className="border-0 px-4 sm:px-6 py-3 sm:py-5 text-center font-bold text-gray-700 bg-gray-200 text-sm sm:text-lg min-w-[140px]">
                        Silver (Local)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Supplied By Row - First Row */}
                    <tr className="hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.01] bg-white">
                      <td className="border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4 font-semibold text-gray-700 text-sm sm:text-base">
                        Supplied By
                      </td>
                      <td className="border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4 text-center bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-800 font-semibold text-sm sm:text-base">
                        RBP
                      </td>
                      <td className="border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4 text-center font-medium text-sm sm:text-base">
                        Module Dealers
                      </td>
                      <td className="border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4 text-center text-gray-600 text-sm sm:text-base">
                        New Local Vendors
                      </td>
                    </tr>

                    {/* Regular Data Rows */}
                    {[
                      { category: "Module", rbp: "Branded", gold: "Branded", silver: "Local" },
                      { category: "Inverter", rbp: "Branded", gold: "–", silver: "Local" },
                      {
                        category: "Structure",
                        rbp: "Hot Dip Galvanized",
                        gold: "Pre Galvanized",
                        silver: "MS/Painted",
                      },
                      { category: "Cable", rbp: "High Quality DC Cable", gold: "DC/AC", silver: "AC" },
                      {
                        category: "Insurance",
                        rbp: "Comprehensive System Insurance",
                        gold: "Not Included",
                        silver: "Not Included",
                      },
                      {
                        category: "Warranty",
                        rbp: "8-Years Complete System",
                        gold: "Upto 5 Years",
                        silver: "1–3 Years",
                      },
                      { category: "Fire Fighting", rbp: "Included", gold: "Not Included", silver: "Not Included" },
                      { category: "Experience", rbp: "13+ Years", gold: "5–7 Years", silver: "New" },
                      { category: "ISO Certified", rbp: "Yes", gold: "May Be", silver: "No" },
                    ].map((row, index) => (
                      <tr
                        key={index}
                        className={`hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.01] ${index % 2 === 0 ? "bg-white" : "bg-gray-25"
                          }`}
                      >
                        <td className="border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4 font-semibold text-gray-700 text-sm sm:text-base">
                          {row.category}
                        </td>
                        <td className="border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4 text-center bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-800 font-semibold text-sm sm:text-base">
                          {row.rbp}
                        </td>
                        <td className="border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4 text-center font-medium text-sm sm:text-base">{row.gold}</td>
                        <td className="border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4 text-center text-gray-600 text-sm sm:text-base">{row.silver}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Scroll Hint */}
              <div className="block sm:hidden mt-4 text-center">
                <p className="text-sm text-gray-500 flex items-center justify-center space-x-2">
                  {/* <span></span> */}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Key Highlights */}
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-lg hover:shadow-3xl transition-all duration-500 animate-fade-in-up animation-delay-600">
            <CardContent className="p-6 sm:p-12">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-4">🔷 Premium Advantages</h2>
                <p className="text-gray-600 text-sm sm:text-base">Exclusive benefits that make RBP the smart choice</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                {[
                  {
                    text: "Complete System Warranty",
                    delay: "0",
                    icon: Shield,
                    description: "Full coverage for peace of mind",
                  },
                  {
                    text: "Factory Designed Structure",
                    delay: "200",
                    icon: Award,
                    description: "Precision engineered quality",
                  },
                  {
                    text: "8 Years Complete Warranty",
                    delay: "400",
                    icon: CheckCircle,
                    description: "Industry-leading protection",
                  },
                ].map((highlight, index) => {
                  const IconComponent = highlight.icon
                  return (
                    <div
                      key={index}
                      className={`group p-6 sm:p-8 bg-gradient-to-br from-white to-teal-50 rounded-3xl border-2 border-teal-100 hover:border-teal-300 hover:shadow-2xl transform hover:scale-105 transition-all duration-500 animate-fade-in-up`}
                      style={{ animationDelay: `${600 + parseInt(highlight.delay)}ms` }}
                    >
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-800 text-base sm:text-lg mb-2 group-hover:text-teal-700 transition-colors duration-300">
                          {highlight.text}
                        </h3>
                        <p className="text-gray-600 text-sm group-hover:text-teal-600 transition-colors duration-300">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer - Powered by Botivate */}
      <div className="relative z-10 pb-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Powered by{" "}
              <a
                href="https://www.botivate.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-700 font-semibold transition-colors duration-300 hover:underline"
              >
                Botivate
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}