
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="mb-10">
          <Button variant="ghost" className="gap-2 mb-4" asChild>
            <Link to="/"><ArrowLeft size={16} /> Back to Home</Link>
          </Button>
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground mt-2">Last updated: November 30, 2023</p>
        </div>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Introduction</h2>
          <p>
            AKAR ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website www.akar.cloud, use our mobile application, or engage with our services.
          </p>
          <p>
            Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site or use our services.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
          
          <h3 className="text-xl font-medium">Personal Information</h3>
          <p>
            We may collect personal information that you voluntarily provide to us when you:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Register for an account</li>
            <li>Express interest in obtaining information about us or our products</li>
            <li>Participate in activities on our platforms</li>
            <li>Contact customer support</li>
            <li>Engage with us through our digital platforms</li>
          </ul>
          <p>
            Personal information may include your name, email address, phone number, billing address, and financial information when making purchases or investments.
          </p>
          
          <h3 className="text-xl font-medium">Information Automatically Collected</h3>
          <p>
            When you visit our website or use our mobile application, we may collect certain information automatically, including:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>IP addresses</li>
            <li>Browser type</li>
            <li>Operating system</li>
            <li>Device information</li>
            <li>Usage patterns and navigation paths</li>
            <li>Referral sources</li>
            <li>Visit duration and frequency</li>
          </ul>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
          <p>
            We may use the information we collect for various purposes, including:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Providing, operating, and maintaining our services</li>
            <li>Improving, personalizing, and expanding our services</li>
            <li>Understanding and analyzing how you use our services</li>
            <li>Developing new products, services, features, and functionality</li>
            <li>Communicating with you for customer service, updates, and marketing purposes</li>
            <li>Processing transactions and sending related information</li>
            <li>Preventing fraudulent activities</li>
            <li>Monitoring and analyzing trends, usage, and activities in connection with our services</li>
          </ul>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. Sharing Your Information</h2>
          <p>
            We may share information with third parties in certain circumstances:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong>Business Partners:</strong> We may share your information with our business partners to offer you certain products, services, or promotions.</li>
            <li><strong>Service Providers:</strong> We may share your information with third-party vendors, service providers, contractors, or agents who perform services for us.</li>
            <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
            <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
            <li><strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with your consent.</li>
          </ul>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Data Security</h2>
          <p>
            We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please note that no electronic transmission or storage of information can be guaranteed to be 100% secure.
          </p>
          <p>
            We employ industry-standard encryption technologies, firewalls, intrusion detection systems, and regular security audits to protect your information. All transactions on our platform are processed through secure encryption protocols.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">6. Your Data Protection Rights</h2>
          <p>
            Depending on your location and applicable laws, you may have the following rights regarding your personal information:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong>Right to Access:</strong> You have the right to request copies of your personal information.</li>
            <li><strong>Right to Rectification:</strong> You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
            <li><strong>Right to Erasure:</strong> You have the right to request that we erase your personal information, under certain conditions.</li>
            <li><strong>Right to Restrict Processing:</strong> You have the right to request that we restrict the processing of your personal information, under certain conditions.</li>
            <li><strong>Right to Object to Processing:</strong> You have the right to object to our processing of your personal information, under certain conditions.</li>
            <li><strong>Right to Data Portability:</strong> You have the right to request that we transfer the data we have collected to another organization, or directly to you, under certain conditions.</li>
          </ul>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">7. Children's Privacy</h2>
          <p>
            Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal data from children without verification of parental consent, we take steps to remove that information from our servers.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">8. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
          </p>
          <p>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">9. International Data Transfers</h2>
          <p>
            Your information may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those in your jurisdiction.
          </p>
          <p>
            If you are located outside Indonesia and choose to provide information to us, please note that we transfer the data, including personal data, to Indonesia and process it there. Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">10. Changes to this Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this page.
          </p>
          <p>
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">11. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>By email: info@akar.cloud</li>
            <li>By phone: (+62)85 156142193</li>
            <li>By mail: AKAR Headquarters, Jakarta, Indonesia</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
