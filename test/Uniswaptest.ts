// import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
// import { ethers } from "hardhat";
// import { CalHash, 
//          CalHash__factory,
//          Token1,
//          Token1__factory,
//          Token2,
//          Token2__factory,
//          UniswapV2Factory,
//          UniswapV2Factory__factory,
//          UniswapV2Pair,
//          UniswapV2Pair__factory,
//          UniswapV2Router02,
//          UniswapV2Router02__factory,
//          WETHToken, 
//          WETHToken__factory} from "../typechain";
// import { BigNumber } from "ethers";
// import { expect } from "chai";
// import chai from "chai";
// import { expandTo18Decimals, expandTo6Decimals } from "./utilities/utilities";
// import { sign } from "crypto";
// chai.use(require("chai-bignumber")(BigNumber));

// describe("Uniswap test", ()=>{
//     let owner:SignerWithAddress;
//     let signers:SignerWithAddress[];
//     let token1 : Token1;
//     let token2 : Token2;
//     let getinit : CalHash;
//     let factory : UniswapV2Factory;
//     let weth : WETHToken;
//     let router02 : UniswapV2Router02;
//     let pair : UniswapV2Pair;

//     beforeEach(async()=>{
//         signers = await ethers.getSigners();
//         owner = await signers[0];
//         token1 = await new Token1__factory(owner).deploy("Token1","TKC1",expandTo18Decimals(10000));
//         token2 = await new Token2__factory(owner).deploy("Token2","TKC2",expandTo18Decimals(10000));
//         weth = await new WETHToken__factory(owner).deploy();
//         factory = await new UniswapV2Factory__factory(owner).deploy(owner.address);
//         router02 = await new UniswapV2Router02__factory(owner).deploy(factory.address,weth.address);
//     })

//     //Creating the hash function and pasting it in factory contract.

//     describe("Creating hash function",async()=>{
//         it("Creating hash", async()=>{
//            let createdhash = await getinit.getInitHash();
//            console.log(createdhash);
           
//         })

//     })

//     describe("RouterV02", async()=>{
//         it("addLiquidity",async()=>{
//             await token1.connect(owner).approve(router02.address,expandTo18Decimals(5000));
//             await token2.connect(owner).approve(router02.address,expandTo18Decimals(5000));
//             await router02.connect(owner).addLiquidity(
//                 token1.address,
//                 token2.address,
//                 expandTo18Decimals(1000),
//                 expandTo18Decimals(1000),
//                 expandTo18Decimals(50),
//                 expandTo18Decimals(50),
//                 owner.address,
//                 1714521599
//             );
//            let remainingBalance=  await token1.balanceOf(owner.address);
//            expect(remainingBalance).to.be.eq(expandTo18Decimals(9000));
//         })

        
//             it.only("Checking pair reserve: ",async()=>{
//                 await token1.connect(owner).approve(router02.address,expandTo18Decimals(5000));
//                 await token2.connect(owner).approve(router02.address,expandTo18Decimals(5000));
//                 await router02.connect(owner).addLiquidity(
//                     token1.address,
//                     token2.address,
//                     expandTo18Decimals(1000),
//                     expandTo18Decimals(1000),
//                     expandTo18Decimals(50),
//                     expandTo18Decimals(50),
//                     owner.address,
//                     1714521599
//                 );
//                 let pairAddress =  await factory.getPair(token1.address,token2.address);
//                 const pairInstance = new UniswapV2Pair__factory(owner).attach(pairAddress);

//                 console.log("Pair Reserve: "+await pairInstance.getReserves());
//                 let liquidityBalance = (await pairInstance.balanceOf(owner.address));
//                 console.log("Liquidity token: "+ liquidityBalance);
//             })

//             it("Removing liquidity", async()=>{
//                 await token1.connect(owner).approve(router02.address,expandTo18Decimals(5000));
//                 await token2.connect(owner).approve(router02.address,expandTo18Decimals(5000));
//                 await router02.connect(owner).addLiquidity(
//                     token1.address,
//                     token2.address,
//                     expandTo18Decimals(1000),
//                     expandTo18Decimals(1000),
//                     expandTo18Decimals(50),
//                     expandTo18Decimals(50),
//                     owner.address,
//                     1714521599
//                 );
//                 let pairAddress =  await factory.getPair(token1.address,token2.address); 
//                 const pairInstance = await new UniswapV2Pair__factory(owner).attach(pairAddress);
//                 console.log("Liquidity token:        "+ await pairInstance.balanceOf(owner.address));
//                 // console.log("Pair Balance" + await pairInstance.getReserves());
//                 console.log("Token1 Balance: "+await token1.balanceOf(owner.address));
//                 console.log("Token2 balance: "+ await token2.balanceOf(owner.address));

//                 let liquidityToken = await pairInstance.balanceOf(owner.address);
//                 await pairInstance.connect(owner).approve(router02.address,liquidityToken);

//                 await router02.connect(owner).removeLiquidity(
//                     token1.address,
//                     token2.address,
//                     liquidityToken,
//                     expandTo18Decimals(50),
//                     expandTo18Decimals(50),
//                     owner.address,
//                     1714521599
//                 );
//                 console.log("Liquidity token:        "+ await pairInstance.balanceOf(owner.address));
//                 // console.log("Pair Balance" + await pairInstance.getReserves());
//                 console.log("Token1 Balance: "+await token1.balanceOf(owner.address));
//                 console.log("Token2 balance: "+ await token2.balanceOf(owner.address));
//             })

//             it("addLiquidityEth",async()=>{

//                 ////Deposit eth in weth contract
//                 ////


//                 await token1.connect(owner).approve(router02.address,expandTo18Decimals(10000));
//                 await router02.connect(owner).addLiquidityETH(
//                     token1.address,
//                     expandTo18Decimals(5000),
//                     expandTo18Decimals(50),
//                     expandTo18Decimals(1),
//                     owner.address,
//                     1714521599,
//                     {value :expandTo18Decimals(1000)}
//                 );
//                 let pairAddress = await factory.getPair(token1.address,weth.address);
//                 let wethBalance = await weth.balanceOf(pairAddress);
//                 console.log("Weth balance is: "+wethBalance);
//                 const pairInstance = await new UniswapV2Pair__factory(owner).attach(pairAddress);
//                 console.log("Pair Reserves:  "+ await pairInstance.getReserves());
//              })

//              it("removeLiquidityEth",async()=>{
//                 await token1.connect(owner).approve(router02.address,expandTo18Decimals(10000));
//                 await router02.connect(owner).addLiquidityETH(
//                     token1.address,
//                     expandTo18Decimals(5000),
//                     expandTo18Decimals(50),
//                     expandTo18Decimals(1),
//                     owner.address,
//                     1714521599,
//                     {value :expandTo18Decimals(1000)}
//                 );
//                 let pairAddress = await factory.getPair(token1.address,weth.address);
//                 let wethBalance = await weth.balanceOf(pairAddress);
//                 console.log("Weth balance is: "+wethBalance);
//                 const pairInstance = await new UniswapV2Pair__factory(owner).attach(pairAddress);
//                 console.log("Pair Reserves:  "+ await pairInstance.getReserves());

//                  })

//                 it("swapEthforExactTokens",async()=>{
//                     await token1.connect(owner).approve(router02.address,expandTo18Decimals(10000));
//                     await router02.connect(owner).addLiquidityETH(
//                         token1.address,
//                         expandTo18Decimals(5000),
//                         expandTo18Decimals(50),
//                         expandTo18Decimals(1),
//                         owner.address,
//                         1714521599,
//                         {value: expandTo18Decimals(10)} 
//                     );
//                     // await token1.connect(owner).transfer(signers[1].address,expandTo18Decimals(1000));
//                      let path = [weth.address,token1.address];
//                      let pairAddress = await factory.getPair(token1.address,weth.address);


//                      console.log("Token1 balance fro user:  "+await token1.balanceOf(signers[1].address));
//                      console.log("Eth balance after transaction: "+await ethers.provider.getBalance(signers[1].address));



//                     await router02.connect(signers[1]).swapETHForExactTokens(
//                         expandTo18Decimals(10),
//                         path,
//                         signers[1].address,
//                         1714521599,
//                         {value: expandTo18Decimals(10)}
//                     );

//                     expect(await token1.balanceOf(signers[1].address)).to.be.eq(expandTo18Decimals(10));
                    
//                     console.log("Token1 balance for user: "+await token1.balanceOf(signers[1].address));

//                     console.log("Weth balance after transaction: "+await ethers.provider.getBalance(signers[1].address));

//                 })

//                 it("swapExactEthForTokens",async()=>{
//                     await token1.connect(owner).approve(router02.address,expandTo18Decimals(10000));
//                     await router02.connect(owner).addLiquidityETH(
//                         token1.address,
//                         expandTo18Decimals(5000),
//                         expandTo18Decimals(50),
//                         expandTo18Decimals(1),
//                         owner.address,
//                         1714521599,
//                         {value: expandTo18Decimals(10)} 
//                     );

//                     let path = [weth.address, token1.address];

//                     await router02.connect(signers[1]).swapExactETHForTokens(
//                         expandTo18Decimals(2),
//                         path,
//                         signers[1].address,
//                         1714521599,
//                         {value: expandTo18Decimals(5)}
//                         );
//                     console.log("Token balance for user: "+await token1.balanceOf(signers[1].address));

//                 })

//                 it("swapExactTokensForEth",async()=>{
                    
//                     await token1.connect(owner).approve(router02.address,expandTo18Decimals(10000));
//                     await token1.connect(owner).transfer(signers[1].address,expandTo18Decimals(1000));
//                     await router02.connect(owner).addLiquidityETH(
//                         token1.address,
//                         expandTo18Decimals(5000),
//                         expandTo18Decimals(50),
//                         expandTo18Decimals(1),
//                         owner.address,
//                         1714521599,
//                         {value: expandTo18Decimals(100)} 
//                     );
                    
//                     let path = [token1.address,weth.address];


//                     console.log("Current ether balance: "+ await ethers.provider.getBalance(signers[1].address));
//                     await token1.connect(signers[1]).approve(router02.address,expandTo18Decimals(2000));

//                     await router02.connect(signers[1]).swapExactTokensForETH(
//                         expandTo18Decimals(1000),
//                         expandTo18Decimals(1),
//                         path,
//                         signers[1].address,
//                         1714521599
//                      );
//                      console.log("New ether balance: "+ await ethers.provider.getBalance(signers[1].address));
//                  })

//                  it("swapExactTokensforTokens",async()=>{
//                     await token1.connect(owner).approve(router02.address,expandTo18Decimals(5000));
//                     await token2.connect(owner).approve(router02.address,expandTo18Decimals(5000));
//                     await router02.connect(owner).addLiquidity(
//                         token1.address,
//                         token2.address,
//                         expandTo18Decimals(1000),
//                         expandTo18Decimals(1000),
//                         expandTo18Decimals(50),
//                         expandTo18Decimals(50),
//                         owner.address,
//                         1714521599
//                     );

//                     let path = [token1.address,token2.address];

//                     console.log("Current balance for token 2: "+await token2.balanceOf(signers[1].address));

//                     await token1.connect(signers[1]).approve(router02.address,expandTo18Decimals(1000));


//                     await token1.connect(owner).transfer(signers[1].address,expandTo18Decimals(1000));

//                     await router02.connect(signers[1]).swapExactTokensForTokens(
//                         expandTo18Decimals(500),
//                         expandTo18Decimals(4),
//                         path,
//                         signers[1].address,
//                         1714521599
//                     );

//                     console.log("New balance for token 2: "+await token2.balanceOf(signers[1].address));

//                     let pairAddress = await factory.getPair(token1.address,token2.address);

//                     const pairInstance = await new UniswapV2Pair__factory(owner).attach(pairAddress);

//                     console.log(await pairInstance.getReserves());

//                  })








//     })
// })