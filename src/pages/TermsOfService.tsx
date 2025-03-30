
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="mb-10">
          <Button variant="ghost" className="gap-2 mb-4" asChild>
            <Link to="/"><ArrowLeft size={16} /> Back to Home</Link>
          </Button>
          <h1 className="text-4xl font-bold">Terms of Service</h1>
          <p className="text-muted-foreground mt-2">Last updated: November 30, 2023</p>
        </div>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Agreement to Terms</h2>
          <p>
            These Terms of Service constitute a legally binding agreement made between you and AKAR ("we," "us," or "our"), concerning your access to and use of the www.akar.cloud website, mobile application, and services.
          </p>
          <p>
            You agree that by accessing our services, you have read, understood, and agree to be bound by all of these Terms of Service. If you do not agree with all of these terms, you are prohibited from using our services and must discontinue use immediately.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Services</h2>
          <p>
            AKAR provides a platform for container farming technology, monitoring systems, and blockchain-based agricultural investments. Our services include:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Farm management dashboards and monitoring systems</li>
            <li>Blockchain-based agricultural asset tokenization</li>
            <li>Token purchase, trading, and management</li>
            <li>Educational resources about sustainable farming</li>
            <li>Container farm sales and deployment</li>
          </ul>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. User Registration</h2>
          <p>
            To access certain features of our platform, you may be required to register for an account. You agree to:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Provide accurate, current, and complete information during registration</li>
            <li>Maintain and promptly update your account information</li>
            <li>Maintain the security of your account and password</li>
            <li>Accept responsibility for all activities that occur under your account</li>
            <li>Notify us immediately of any unauthorized access to or use of your account</li>
          </ul>
          <p>
            We reserve the right to disable any user account, at any time, if in our opinion you have violated any provision of these Terms of Service.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. Blockchain and Tokenization</h2>
          <p>
            AKAR utilizes blockchain technology to tokenize agricultural assets. By using our tokenization services, you acknowledge and agree that:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Blockchain transactions are irreversible and cannot be canceled once initiated</li>
            <li>You are solely responsible for maintaining the security of your digital wallet</li>
            <li>Token values may fluctuate and investments carry inherent risks</li>
            <li>Regulatory changes may impact token functionality or availability</li>
            <li>You will comply with all applicable laws regarding cryptocurrency and digital asset investments</li>
          </ul>
          <p>
            AKAR tokens ($AKR) are utility tokens that represent ownership or rights to agricultural assets but are not securities or investments under Indonesian law.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property of AKAR and its licensors. The Service is protected by copyright, trademark, and other laws of Indonesia and foreign countries.
          </p>
          <p>
            Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of AKAR.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">6. User Content</h2>
          <p>
            Our Service may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. By providing User Content to the Service, you:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Grant us a non-exclusive, transferable, sub-licensable, royalty-free, worldwide license to use the content</li>
            <li>Represent and warrant that you own or have the necessary rights to such content</li>
            <li>Confirm the content does not violate the rights of any third party</li>
            <li>Agree that the content is not illegal, obscene, threatening, defamatory, or otherwise objectionable</li>
          </ul>
          <p>
            We reserve the right to monitor and remove any user content that violates these terms or is otherwise objectionable.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">7. Prohibited Uses</h2>
          <p>
            You may use our Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>In any way that violates any applicable local, national, or international law or regulation</li>
            <li>To impersonate or attempt to impersonate AKAR, an AKAR employee, another user, or any other person</li>
            <li>To engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Service</li>
            <li>To attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Service</li>
            <li>To use the Service for money laundering, terrorist financing, or other illegal activities</li>
            <li>To manipulate token markets or engage in fraudulent token-related activities</li>
          </ul>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">8. Disclaimer of Warranties</h2>
          <p>
            The Service is provided on an "AS IS" and "AS AVAILABLE" basis. AKAR and its suppliers expressly disclaim all warranties of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
          </p>
          <p>
            Neither AKAR nor its suppliers guarantees that the Service will be uninterrupted, timely, secure, or error-free, or that the results that may be obtained from the use of the Service will be accurate or reliable.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">9. Limitation of Liability</h2>
          <p>
            In no event shall AKAR, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Your access to or use of or inability to access or use the Service</li>
            <li>Any conduct or content of any third party on the Service</li>
            <li>Any content obtained from the Service</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            <li>Fluctuations in the value of digital tokens or agricultural assets</li>
            <li>Technical failures, blockchain network issues, or cyber attacks</li>
          </ul>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">10. Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless AKAR and its licensee and licensors, and their employees, contractors, agents, officers, and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees) arising from:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Your use of and access to the Service</li>
            <li>Your violation of any term of these Terms of Service</li>
            <li>Your violation of any third-party right, including without limitation any intellectual property right, publicity, confidentiality, property, or privacy right</li>
            <li>Any claim that your User Content caused damage to a third party</li>
          </ul>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">11. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the Republic of Indonesia, without regard to its conflict of law provisions.
          </p>
          <p>
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">12. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
          <p>
            By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">13. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us:
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

export default TermsOfService;
