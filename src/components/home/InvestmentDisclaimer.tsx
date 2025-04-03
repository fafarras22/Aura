
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Info, AlertTriangle } from "lucide-react";

export const InvestmentDisclaimer = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-2">Investment Risks</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Agricultural investments carry inherent risks including but not limited to weather conditions, market fluctuations, and operational challenges.</li>
                    <li>• Past performance does not guarantee future results.</li>
                    <li>• Investment values can go up or down.</li>
                    <li>• Consider diversifying your investment portfolio.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-2">Important Notice</h4>
                  <p className="text-sm text-muted-foreground">
                    AKAR is a platform for agricultural investments. All investments carry risk. By using this platform, you acknowledge that you have read and understood our terms of service, privacy policy, and risk disclosure. Digital tokens are not insured by any governmental agency and are not bank deposits.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-xs text-muted-foreground">
          <p className="mb-2">
            Investment opportunities posted on this website are "private placements" of securities that are not publicly traded, are subject to holding period requirements, and are intended for investors who do not need a liquid investment. Investing in private placements requires high risk tolerance, low liquidity concerns, and long-term commitments.
          </p>
          <p>
            Neither AKAR nor any of its affiliates make any warranties or representations as to the accuracy or completeness of the information contained on the website. The information contained herein has been prepared without regard to any particular investor's investment objectives, financial situation, or means.
          </p>
        </div>
      </div>
    </div>
  );
};
