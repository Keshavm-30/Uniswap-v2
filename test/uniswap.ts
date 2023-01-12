import {expect} from "chai";
import {ethers} from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { time } from "console";
import { mineBlocks, expandTo18Decimals } from "./utilities/utilities";

import{
Token1,
Token1__factory,
Token2,
Token2__factory,
CalHash,
CalHash__factory,
UniswapV2Factory,
UniswapV2Factory__factory,
UniswapV2Pair,
UniswapV2Pair__factory,
UniswapV2Router02,
UniswapV2Router02__factory,
WETHToken, 
WETHToken__factory
} from "../typechain";
import { execPath } from "process";
import { string } from "hardhat/internal/core/params/argumentTypes";

describe("Testing", function() {
    let token1 : Token1;
    let token2 : Token2;
    let gethash : CalHash;
    let factory : UniswapV2Factory;
    let router : UniswapV2Router02;
    let wth : WETHToken;
    let owner: SignerWithAddress;
    let signers: SignerWithAddress[];

    beforeEach("", async() => {
        signers = await ethers.getSigners();
        owner = signers[0];
        token1 = await new Token1__factory(owner).deploy("KToken1","KTC1",2000);
        token2 = await new Token2__factory(owner).deploy("Ktoken2","KTC2",1000);
        gethash = await new CalHash__factory(owner).deploy();
        let createdhash = await gethash.getInitHash();
        console.log(createdhash);
        wth = await new WETHToken__factory(owner).deploy();
        factory = await new UniswapV2Factory__factory(owner).deploy(owner.address);
        router = await new UniswapV2Router02__factory(owner).deploy(factory.address,wth.address);
        
        });
        // describe("Calling hash function",async()=>{
        //             it("Generating hash", async()=>{
        //                let createdhash = await gethash.getInitHash();
        //                console.log(createdhash);
                       
        //             })
        //         })
        describe("approvind funds to router", async()=>{
            it("tokens giving approvel to router", async()=>{
                await token1.connect(owner).approve(router.address,expandTo18Decimals(5000));
                await token2.connect(owner).approve(router.address,expandTo18Decimals(5000));
            })
        }) 
        describe("adding liquidity", async()=>{
            it("adding liquidity", async()=>{
                await token1.connect(owner).mint(signers[5].address,expandTo18Decimals(2000));
                await token2.connect(owner).mint(signers[5].address,expandTo18Decimals(1000));
                await token1.connect(signers[5]).approve(router.address,expandTo18Decimals(5000));
                await token2.connect(signers[5]).approve(router.address,expandTo18Decimals(5000));
                await token1.connect(owner).approve(router.address,expandTo18Decimals(5000));
                            await token2.connect(owner).approve(router.address,expandTo18Decimals(5000));
                            await router.connect(owner).addLiquidity(
                                token1.address,
                                token2.address,
                                expandTo18Decimals(2000),
                                expandTo18Decimals(1000),
                                expandTo18Decimals(20),
                                expandTo18Decimals(10),
                                owner.address,
                                1714521599
                            );

                            console.log("balance of owner(token1) after adding liquidity",await token1.balanceOf(owner.address))
                            console.log("balance of owner(token2) after adding liquidity",await token2.balanceOf(owner.address))
                        let remainingBalanceT1 =  await token1.balanceOf(owner.address);
                        expect(remainingBalanceT1).to.be.eq(expandTo18Decimals(0)); 
                        let remainingBalanceT2=  await token2.balanceOf(owner.address);
                        expect(remainingBalanceT2).to.be.eq(expandTo18Decimals(0)); 

                        await router.connect(signers[5]).addLiquidity(
                            token1.address,
                            token2.address,
                            expandTo18Decimals(2000),
                            expandTo18Decimals(1000),
                            expandTo18Decimals(20),
                            expandTo18Decimals(10),
                            signers[5].address,
                            1714521599
                        );
                        
                        
                        let pairAddress =  await factory.getPair(token1.address,token2.address);
                        const pairInstance = new UniswapV2Pair__factory(owner).attach(pairAddress);
                        console.log("Pair Reserve: ",await pairInstance.getReserves());
                        let liquidityBalance = (await pairInstance.balanceOf(owner.address));
                        console.log("Liquidity token: ", liquidityBalance);

                        await pairInstance.connect(signers[5]).transfer(pairAddress,"1414213562373095048801");
                        let liquidityBalance2 = (await pairInstance.balanceOf(signers[5].address));
                        console.log("Liquidity token: ", liquidityBalance2);
            
                        await pairInstance.connect(owner).approve(router.address,liquidityBalance);
                        await router.connect(owner).removeLiquidity(token1.address,
                            token2.address,
                            liquidityBalance,
                            1,
                            1,
                            owner.address,
                            1714521599
                            )
                          
                            console.log("Pair Reserve after: ",await pairInstance.getReserves());
                            console.log("balance of owner(token1) after remove liquidity",await token1.balanceOf(owner.address))
                            console.log("balance of owner(token2) after remove liquidity",await token2.balanceOf(owner.address))
            })
        })       

    
    
});
