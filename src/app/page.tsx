import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import { ArrowUpRight, CheckCircle2, Shield, Users, Zap } from "lucide-react";
import { createClient } from "../../supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Features Designed for Creators
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our intuitive platform helps you showcase your work and connect
              with your audience through a single, customizable link.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Drag & Drop Builder",
                description:
                  "Intuitive interface with niche-specific templates",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Content Blocks",
                description: "Buttons, social icons, and media embeds",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Mobile Optimized",
                description: "Perfect display on all devices with live preview",
              },
              {
                icon: <CheckCircle2 className="w-6 h-6" />,
                title: "Analytics Dashboard",
                description: "Track views and clicks on your links",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Templates for Every Creator
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Specialized templates designed for your specific niche
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="text-2xl font-bold mb-2">Freelancers</div>
              <div className="text-blue-100">
                Showcase your portfolio, services, and testimonials
              </div>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="text-2xl font-bold mb-2">Fitness Trainers</div>
              <div className="text-blue-100">
                Share workout plans, nutrition tips, and booking links
              </div>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="text-2xl font-bold mb-2">Musicians</div>
              <div className="text-blue-100">
                Connect your music, tour dates, and merchandise
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Start for free, upgrade when you need more features.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <div className="text-4xl font-bold mb-6">
                $0
                <span className="text-lg text-gray-500 font-normal">
                  /month
                </span>
              </div>
              <ul className="space-y-3 text-left mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Basic bio link page</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Up to 5 links</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Basic analytics</span>
                </li>
              </ul>
              <a
                href="/dashboard"
                className="inline-flex items-center justify-center w-full px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </a>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-blue-100 ring-2 ring-blue-50">
              <div className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full w-fit mx-auto mb-4">
                RECOMMENDED
              </div>
              <h3 className="text-xl font-bold mb-2">Premium</h3>
              <div className="text-4xl font-bold mb-6">
                $5
                <span className="text-lg text-gray-500 font-normal">
                  /month
                </span>
              </div>
              <ul className="space-y-3 text-left mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Everything in Free</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Unlimited links</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Advanced customization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Detailed analytics</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Custom domain</span>
                </li>
              </ul>
              <a
                href="/dashboard"
                className="inline-flex items-center justify-center w-full px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Upgrade Now
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Create Your Bio Link?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are consolidating their online
            presence with LinkGenius.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started Now
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
