import { getCreditsPack, PackId } from "@/types/billing";
import Stripe from "stripe";
import { prisma } from "../prisma";
export async function HandleCheckoutSessionCompleted(event: Stripe.Checkout.Session){
    if(!event.metadata){
        throw new Error("missing metadata")
    }
    const {userId , packId} = event.metadata
    if(!userId){
        throw new Error("missing user id")
    }
    if(!packId){
        throw new Error("missing user id")
    }

    const purchasesPack = getCreditsPack(packId as PackId)
    if(!purchasesPack){
        throw new Error("purchase pack not found")
    }
    await prisma.userBalance.upsert({
        where : {userId},
        create : {
            userId ,
            credits :purchasesPack.credits
        },
        update : {
            credits : {
                increment : purchasesPack.credits
            }
        }
    })
    await prisma.userPurchase.create({
        data : {
            userId,
            stripeId :event.id,
            description : `${purchasesPack.name} - ${purchasesPack.credits} credits`,
            amount : event.amount_total!,
            currency : event.currency!
        }
    })
}