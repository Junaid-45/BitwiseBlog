import React from "react";
import img from "../assets/about.png";

const features = [
  {
    name: "Design and Layout",
    description:
      "Responsive Design: Ensure your website is mobile-friendly and displays well on various devices.",
  },
  {
    name: "Security",
    description:
      "Solid SSL Certificate: Secure your website with an SSL certificate to enable HTTPS. base with rare earth magnets and powder coated steel card cover",
  },
  {
    name: "Social Media Integration",
    description: "Share Buttons: Include social sharing buttons on your posts.",
  },
  {
    name: "Accessibility",
    description:
      "Ensure your website is accessible to people with disabilities by following accessibility guidelines.",
  },
  {
    name: "Community Building",
    description:
      "Implement features like forums or discussion boards to encourage user interaction.",
  },
  {
    name: "Legal Requirements",
    description:
      "Privacy Policy: Include a privacy policy that complies with data protection regulations.",
  },
];

export default function About() {
  return (
    <div className="">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Website Specifications
          </h2>
          <p className="mt-4 text-gray-500">
            "In today's fast-paced world, finding time to pursue your passions
            and interests can be a challenge. Our blog is here to help you
            navigate the complexities of modern life and make the most of your
            precious moments. Whether you're looking for travel inspiration,
            cooking tips, career advice, or simply seeking a dose of motivation,
            we've got you covered. We aim to provide insightful and practical
            content that empowers you to lead a fulfilling and well-rounded
            life. Join us on this journey of discovery and personal growth as we
            explore a wide range of topics and share our expertise with you.
            Welcome to a place where you can find inspiration, knowledge, and
            the tools to make your dreams a reality."
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">{feature.name}</dt>
                <dd className="mt-2 text-sm text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <img
            src={img}
            alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
            className="rounded-lg bg-gray-100"
          />
          <img
            src={img}
            alt="Top down view of walnut card tray with embedded magnets and card groove."
            className="rounded-lg bg-gray-100"
          />
          <img
            src={img}
            alt="Side of walnut card tray with card groove and recessed card area."
            className="rounded-lg bg-gray-100"
          />
          <img
            src={img}
            alt="Walnut card tray filled with cards and card angled in dedicated groove."
            className="rounded-lg bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
}
