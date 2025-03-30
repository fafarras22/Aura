
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Legal = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="mb-10">
          <Button variant="ghost" className="gap-2 mb-4" asChild>
            <Link to="/"><ArrowLeft size={16} /> Back to Home</Link>
          </Button>
          <h1 className="text-4xl font-bold">Legal Information</h1>
          <p className="text-muted-foreground mt-2">Last updated: November 30, 2023</p>
        </div>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Legal Entity Information</h2>
          <p>
            AKAR operates as PT AKAR Teknologi Indonesia, a limited liability company established and registered under the laws of the Republic of Indonesia.
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong>Company Registration Number:</strong> 123456789012345</li>
            <li><strong>Tax Identification Number (NPWP):</strong> 01.234.567.8-901.000</li>
            <li><strong>Registered Address:</strong> Menara AKAR, Jl. Jenderal Sudirman Kav. 52-53, Jakarta 12190, Indonesia</li>
            <li><strong>Email:</strong> info@akar.cloud</li>
            <li><strong>Phone:</strong> (+62)85 156142193</li>
          </ul>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Regulatory Compliance</h2>
          <p>
            AKAR is committed to full compliance with all applicable laws and regulations, including but not limited to:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Indonesian Company Law (Law No. 40 of 2007)</li>
            <li>Indonesian Investment Law (Law No. 25 of 2007)</li>
            <li>Electronic Information and Transactions Law (Law No. 11 of 2008)</li>
            <li>Government Regulation on Electronic System and Transaction Operations (PP No. 71 of 2019)</li>
            <li>Indonesian Agricultural regulations</li>
            <li>Applicable cryptocurrency and digital asset regulations</li>
          </ul>
          <p>
            Our agricultural operations comply with all relevant licenses, permits, and certifications required for container farming activities in Indonesia.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Tokenization Legal Framework</h2>
          <p>
            AKAR ($AKR) tokens operate under the following legal structure:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>$AKR tokens are utility tokens that represent rights to agricultural assets and services</li>
            <li>These tokens are not classified as securities under current Indonesian regulations</li>
            <li>AKAR tokens operate on the Polygon PoS (Proof of Stake) blockchain</li>
            <li>Token holders do not receive ownership in PT AKAR Teknologi Indonesia</li>
            <li>Revenue sharing from agricultural production is governed by smart contracts</li>
          </ul>
          <p>
            We continuously monitor regulatory developments in the blockchain space and will update our token structure as needed to maintain compliance.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Intellectual Property</h2>
          <p>
            The following intellectual property rights are owned by PT AKAR Teknologi Indonesia:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong>Trademarks:</strong> "AKAR", "AKAR Farm", "AKAR Token", and the AKAR logo are registered trademarks in Indonesia and other jurisdictions</li>
            <li><strong>Patents:</strong> Multiple patents covering our container farming technology, environmental control systems, and agricultural optimization techniques (Patent Numbers: ID-P00202001234, ID-P00202002345)</li>
            <li><strong>Copyrights:</strong> All content on www.akar.cloud, our mobile applications, and marketing materials</li>
            <li><strong>Trade Secrets:</strong> Proprietary farming methodologies, algorithmic growing formulas, and business processes</li>
          </ul>
          <p>
            Unauthorized use of AKAR's intellectual property may result in legal action. For licensing inquiries, please contact us at legal@akar.cloud.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Risk Disclosures</h2>
          <p>
            Investing in agricultural assets and cryptocurrency tokens involves inherent risks, including but not limited to:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong>Market Risk:</strong> Token values may fluctuate significantly</li>
            <li><strong>Agricultural Risk:</strong> Crop failures, disease, or natural disasters may affect farm productivity</li>
            <li><strong>Regulatory Risk:</strong> Changes in laws governing cryptocurrencies or agriculture may impact operations</li>
            <li><strong>Technology Risk:</strong> Blockchain vulnerabilities, smart contract bugs, or cybersecurity incidents</li>
            <li><strong>Liquidity Risk:</strong> There may be limited opportunities to sell or exchange tokens</li>
            <li><strong>Operational Risk:</strong> Issues with farm management, equipment, or supply chains</li>
          </ul>
          <p>
            Before investing, carefully consider your financial situation and risk tolerance. Past performance is not indicative of future results.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">AML and KYC Compliance</h2>
          <p>
            AKAR implements robust Anti-Money Laundering (AML) and Know Your Customer (KYC) procedures for all token purchases and agricultural investments:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Identity verification required for all accounts conducting transactions above a specified threshold</li>
            <li>Continuous monitoring of transactions for suspicious activity</li>
            <li>Compliance with Financial Action Task Force (FATF) recommendations</li>
            <li>Adherence to Indonesian Financial Services Authority (OJK) regulations</li>
            <li>Cooperation with law enforcement agencies when legally required</li>
          </ul>
          <p>
            We reserve the right to refuse service or freeze accounts that do not comply with our AML/KYC policies or are suspected of engaging in illegal activities.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Dispute Resolution</h2>
          <p>
            Any disputes arising from the use of AKAR's services shall be resolved according to the following procedure:
          </p>
          <ol className="list-decimal list-inside space-y-2 pl-4">
            <li>Informal negotiation between the parties</li>
            <li>If not resolved within 30 days, mediation through the Indonesian National Board of Arbitration (BANI)</li>
            <li>If mediation fails, binding arbitration in Jakarta, Indonesia</li>
            <li>Arbitration shall be conducted in accordance with BANI rules</li>
            <li>The arbitration award shall be final and binding upon both parties</li>
          </ol>
          <p>
            Indonesian law shall govern all disputes. You agree to waive your right to participate in class action lawsuits against AKAR.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Corporate Governance</h2>
          <p>
            PT AKAR Teknologi Indonesia is governed by:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong>Board of Directors:</strong> Responsible for day-to-day operations and strategic direction</li>
            <li><strong>Board of Commissioners:</strong> Provides oversight and ensures compliance with laws and regulations</li>
            <li><strong>Shareholders:</strong> Include founding team members and institutional investors</li>
          </ul>
          <p>
            We maintain transparent corporate governance practices and publish regular financial and operational reports to our investors and token holders.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Legal Contacts</h2>
          <p>
            For legal inquiries, please contact:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong>General Legal Matters:</strong> legal@akar.cloud</li>
            <li><strong>Compliance Officer:</strong> compliance@akar.cloud</li>
            <li><strong>Data Protection Officer:</strong> privacy@akar.cloud</li>
            <li><strong>Intellectual Property:</strong> ip@akar.cloud</li>
            <li><strong>Phone:</strong> (+62)85 156142193</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Legal;
