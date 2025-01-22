import { GetAvailableCredits } from "@/actions/billing/GetAvailableCredits";
import ReactCountUpWrapper from "@/components/ReactCountUpWrapper";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeftRightIcon, CoinsIcon } from "lucide-react";
import { Suspense } from "react";
import CreditsPurchase from "./_components/CreditsPurchase";
import { GetCreditsUsageInPeriod } from "@/actions/analytics/GetCreditsUsageInPeriod";
import CreditUsageChart from "../(home)/billing/_components/CreditUsageChart";
import { GetUserPurchaseHistory } from "@/actions/billing/GetUserPurchaseHistory";
import InvoiceBtn from "./_components/InvoiceBtn";
import { UserPurchase } from "@/prisma/generated/client";

export default function BillingPage() {
  return (
    <div className="mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Billing</h1>
      <Suspense fallback={<Skeleton className="h-[160px] w-full" />}>
        <BalanceCard />
      </Suspense>
      <Suspense>

      <CreditsPurchase />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
        <CreditUsageCard  />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
        <TransactionHistoryCard  />
      </Suspense>
    </div>
  );
}

async function BalanceCard() {
  const userBalance = await GetAvailableCredits();

  return (
    <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20 shadow-lg flex justify-between flex-col overflow-hidden">
      <CardContent className="p-6 relative items-center">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Available Credits
            </h3>
            <p className="text-4xl font-bold text-primary">
              <ReactCountUpWrapper value={userBalance} />
            </p>
          </div>
          <CoinsIcon size={140} className="text-primary opacity-20 absolute bottom-0 right-0" />
        </div>
      </CardContent>
      <CardFooter className="text-muted-foreground text-sm">
        When your credit balance reaches zero , your workflow will stop working
      </CardFooter>
    </Card>
  );
}

async function CreditUsageCard(){
  const period = {
    month : new Date().getMonth(),
    year : new Date().getFullYear()
  }
  const data = await GetCreditsUsageInPeriod(period)
  return <CreditUsageChart title="Credits consumed" data={data} description="Daily credit consumed in the current month" />
}

async function TransactionHistoryCard(){
  const purchase = await GetUserPurchaseHistory()
 
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <ArrowLeftRightIcon className="h-6 w-6 text-primary" />
          Transaction History
        </CardTitle>
        <CardDescription>
          View your transaction history and download invoices
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {
          purchase.length === 0 && (
            <p className="text-muted-foreground">No transaction yet</p>

          )
        }
        {
          purchase.map((p :UserPurchase )=>(
            <div key={p.id} className="flex justify-between items-center py-3 border-b last:border-b-0">
              <div>
                <p className="font-medium">{formatDate(p.date)}</p>
                <p className="text-sm text-muted-foreground">{p.description}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {formatAmount(p.amount , p.currency)}
                </p>
                <InvoiceBtn id={p.id} />
              </div>
            </div>
          ))
        }
      </CardContent>
    </Card>
  )
}

function formatAmount(amount : number , currency: string){
  return new Intl.NumberFormat("en-US", {
    style : "currency",
    currency 
  }).format(amount/100)
}
const formatDate =(date : Date)=>{
  return new Intl.DateTimeFormat("en-US",{
    year : 'numeric',
    month :"long",
    day : "numeric"
  }).format(date)
}