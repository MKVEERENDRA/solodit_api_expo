# Solodit Findings Export

**Generated:** 1/29/2026, 7:00:35 PM
**Total Results Available:** 21
**Exported Findings:** 21 out of 21 total
**Pages Fetched:** 1 pages

## 🎯 Applied Filters

- **Impact:** HIGH
- **Tags:** Slippage
- **Languages:** Solidity
- **Sort:** Recency Desc

## 🔍 Findings (21 items)

### 1. [H-02] No slippage protection when interacting with AMM

**Impact:** 🔴 HIGH

**Audit Firm:** Pashov Audit Group
**Protocol:** GammaSwap_2024-12-30
**Quality Score:** 0/5
**Rarity Score:** 0/5
**Report Date:** Invalid Date
**Finders:** Pashov Audit Group

**Summary:**

This bug report highlights an issue with the AMM router (Uniswap) where the parameters `amount0Min` and `amount1Min` are being set to zero during interactions such as swaps and liquidity additions. This exposes transactions to slippage, resulting in receiving or adding smaller amounts than intended. This issue affects all interactions with the AMM and can have different impacts on the protocol. To fix this issue, it is recommended to introduce a state variable to control the slippage percentage or to set a minimum liquidity received and revert the transaction if it falls below this amount. 

**Tags:** Slippage

**Links:** [Source](https://github.com/pashov/audits/blob/master/team/md/GammaSwap-security-review_2024-12-30.md)

---

### 2. H-4: No slippage protection during repayment due to dynamic slippage params and easily influenced `slot0()`

**Impact:** 🔴 HIGH

**Audit Firm:** Sherlock
**Protocol:** Real Wagmi #2
**Quality Score:** 0/5
**Rarity Score:** 0/5
**Report Date:** Invalid Date
**Finders:** 0xblackskull, kaysoft, 0xMaroutis, 0xJuda, 0x52, IceBear, HHK, Nyx, lucifero, MohammedRizwan, tsvetanovv, talfao, pks\_, lil.eth, peanuts, Kral01, p-tsanev

**Summary:**

This bug report is about an issue with the repayment function of the protocol, which lacks slippage protection. This means that if the repayment of the user is sandwiched (frontrunned), the profit of the repayer is decreased till the repayment satisfies the restored liquidity. The absence of slippage protection can be attributed to two key reasons. Firstly, the `sqrtPrice` is derived from `slot0()`, which can be easily manipulated. Secondly, the slippage params are calculated based on a dynamic number calculated on the current state of the blockchain. A Proof of Concept (PoC) demonstrates the issue with comments, showing that the swap does not significantly impact a strongly founded pool, but does result in a loss of a few dollars for the repayer. The impact of this issue is potential profit loss for the repayer.

To address this issue, the team has recommended avoiding relying on slot0 and instead utilizing Uniswap TWAP. Additionally, they suggest considering manually setting values for amountOutMin for swaps based on data acquired before repayment. The severity level of this issue was initially deemed to be medium, but was later determined to be high. The team has fixed the issue, and the fix can be found on GitHub.

**Tags:** Slippage, Uniswap, Stale Price

**Links:** [GitHub](https://github.com/sherlock-audit/2023-10-real-wagmi-judging/issues/109)

---

### 3. H-4: Deposit transactions lose funds to front-running when multiple fee tiers are available

**Impact:** 🔴 HIGH

**Audit Firm:** Sherlock
**Protocol:** RealWagmi
**Quality Score:** 0/5
**Rarity Score:** 0/5
**Report Date:** Invalid Date
**Finders:** crimson-rat-reach

**Summary:**

This bug report is about an issue with deposit transactions in the Multipool contract, which can result in users losing funds due to front-running when multiple fee tiers are available. A malicious actor can limit the number of LP tokens that the user receives by first moving the price of feeTier1 to make tokenA very cheap and then moving the price of feeTier2 in the opposite direction to make tokenB very cheap. This results in reserves being balanced across feeTiers, and the amounts resulting from '_optimizeAmounts' are balanced as well. However, due to the large swap, the ratio of LP tokens minted becomes a lot smaller than before the large swap.

The bug report was discussed by several people, with some suggesting it should be a low/non-issue due to the slippage of the UniswapV3 pool during the attacker's swaps. However, SergeKireev argued that the attacker can increase both reserves precisely because multiple underlying pools are available (multiple fee tiers), so the attacker adds more of token0 to one fee tier and more of token1 to the other fee tier.

Finally, fann95 suggested that there was a protection for a similar scenario of price manipulation in pools, and that the issue may be invalid. Hrishibhat agreed, and the issue was accepted as a valid high as it opens a user to sandwiching and the funds at loss are unbounded. A code snippet was added to simplify the slip check and add the minimum acceptable amount of liquidity tokens to be minted.

**Tags:** Slippage

**Links:** [GitHub](https://github.com/sherlock-audit/2023-06-real-wagmi-judging/issues/105)

---

### 4. H-2: No slippage protection when withdrawing and providing liquidity in rebalanceAll

**Impact:** 🔴 HIGH

**Audit Firm:** Sherlock
**Protocol:** RealWagmi
**Quality Score:** 0/5
**Rarity Score:** 0/5
**Report Date:** Invalid Date
**Finders:** ast3ros, n33k

**Summary:**

This bug report is about the lack of slippage protection when withdrawing and providing liquidity in the rebalanceAll function. When rebalanceAll is called, liquidity is first withdrawn from the pools and then deposited to new positions, but there are no parameters for `amount0Min` and `amount1Min`, which are used to prevent slippage. This could result in a loss for the LPs of the multipool. The bug was found by ast3ros and n33k and was fixed by fann95 who implemented a _checkPriceDeviation function to check deviations from the weighted average price for each pool before withdrawing and depositing. Slippage is also checked during exchange. The recommendation is to implement slippage protection in rebalanceAll to avoid losses.

**Tags:** Slippage

**Links:** [GitHub](https://github.com/sherlock-audit/2023-06-real-wagmi-judging/issues/94)

---

### 5. TRST-H-8 “Exact output” swaps cannot be executed, blocking repayment of debt

**Impact:** 🔴 HIGH

**Audit Firm:** Trust Security
**Protocol:** Stella
**Quality Score:** 0/5
**Rarity Score:** 0/5
**Report Date:** Invalid Date
**Finders:** Trust Security

**Summary:**

This bug report is about an issue with Uniswap V2 and V3 when performing “exact output” swaps. The maximum input amount argument was set to 0, which caused the slippage check in the Uniswap contracts to always revert because the swaps would require more input tokens. This was considered high-severity because an “exact output” swap is mandatory when closing a position that doesn’t have enough tokens to repay the borrowed amount. 

The recommended mitigation was to set the maximum input amount arguments to type(uint256).max. The team fixed the issue as recommended, and the mitigation was reviewed.

**Tags:** Slippage, Business Logic

**Links:** [Source](https://github.com/solodit/solodit_content/blob/main/reports/Trust Security/2023-05-29-Stella.md)

---

### 6. H-14: Deadline check is not effective, allowing outdated slippage and allow pending transaction to be unexpected executed

**Impact:** 🔴 HIGH

**Audit Firm:** Sherlock
**Protocol:** Blueberry Update
**Quality Score:** 0/5
**Rarity Score:** 0/5
**Report Date:** Invalid Date
**Finders:** Bauer, Breeje, ctf\_sec

**Summary:**

This bug report is about an issue found in CurveSpell.sol, a smart contract used to provide liquidity to decentralized exchanges (DEXs). The issue is that the deadline check is set to type(uint256).max, which means the deadline check is disabled. This allows outdated slippage and pending transactions to be executed unexpectedly. 

This issue can be maliciously exploited through the process of miner extractable value (MEV), where a MEV bot can detect a pending transaction and sandwich Alice, resulting in significant profit for the bot and significant loss for Alice. 

The bug was found by Bauer, Breeje, and ctf_sec, and the code snippet can be found on GitHub.

The recommendation is that the protocol should use block.timestamp for swapping deadline for Uniswap V2 and swap with Unsiwap Router V3 instead of the pool directly.

**Tags:** Slippage, Uniswap, Swap, Lending Pool, Deadline

**Links:** [GitHub](https://github.com/sherlock-audit/2023-04-blueberry-judging/issues/145)

---

### 7. H-9: UniswapV3 sqrtRatioLimit doesn't provide slippage protection and will result in partial swaps

**Impact:** 🔴 HIGH

**Audit Firm:** Sherlock
**Protocol:** Blueberry Update
**Quality Score:** 5/5
**Rarity Score:** 5/5
**Report Date:** Invalid Date
**Finders:** 0x52

**Summary:**

This bug report is about the issue H-9 which was found by 0x52. The sqrtRatioLimit for UniV3 doesn't cause the swap to revert upon reaching that value. Instead, it just causes the swap to partially fill. This is a known issue with using sqrtRatioLimit as can be seen in the code snippet, where the swap ends prematurely when it has been reached. This is problematic as this is meant to provide the user with slippage protection but doesn't. This incorrect slippage application can result in partial swaps and loss of funds. The code snippet provided is from IchiSpell.sol#L181-L236. The tool used to identify this bug was manual review. The recommendation given is to check the amount received from the swap and compare it against some user supplied minimum.

**Tags:** Uniswap, Swap, Slippage, Missing-Logic, Configuration

**Links:** [GitHub](https://github.com/sherlock-audit/2023-04-blueberry-judging/issues/132)

---

### 8. H-6: ShortLongSpell#_withdraw checks slippage limit but never applies it making it useless

**Impact:** 🔴 HIGH

**Audit Firm:** Sherlock
**Protocol:** Blueberry Update
**Quality Score:** 0/5
**Rarity Score:** 0/5
**Report Date:** Invalid Date
**Finders:** Ch\_301, 0x52

**Summary:**

A bug has been identified in the ShortLongSpell protocol, where the sell slippage is checked but never applied, making it useless. This is an important protection in the event that a user finds a way to trick collateral requirements. The code snippet that is affected can be found at ShortLongSpell.sol#L160-L202. The bug was discovered by 0x52 and Ch\_301.

The impact of this bug is that slippage limit protections are ineffective for ShortLongSpell. The recommendation is to apply sell slippage after it is checked.

The bug was discussed by securitygrid, sherlock-admin, ctf-sec, and hrishibhat. Securitygrid pointed out that the toAmont and expectedAmount in the off-chain parameter MegaSwapSellData structure are the real slippage protection parameters, and that this is similar to the ExactInputParams/ExactOutputParams of uniswapV3 pool. Ctf-sec argued that the code should still check the slippage based on the received amount instead of off-chain parameter. Hrishibhat then rejected the escalation, saying that slippage must be checked on code whenever possible instead of an off-chain parameter. Sherlock-admin then confirmed that the escalations had been rejected and that Watsons who escalated the issue will have their escalation amount deducted from their next payout.

**Tags:** Configuration, Coding-Bug, Slippage

**Links:** [GitHub](https://github.com/sherlock-audit/2023-04-blueberry-judging/issues/126)

---

### 9. H-5: ConvexSpell#closePositionFarm removes liquidity without any slippage protection

**Impact:** 🔴 HIGH

**Audit Firm:** Sherlock
**Protocol:** Blueberry Update
**Quality Score:** 0/5
**Rarity Score:** 0/5
**Report Date:** Invalid Date
**Finders:** Ch\_301, 0x52, Breeje, n1punp

**Summary:**

This bug report is about the ConvexSpell and CurveSpell smart contracts, which are used to remove liquidity from Curve pools. The issue is that these smart contracts remove liquidity without any slippage protection, which makes them vulnerable to sandwich attacks. This means that user withdrawals can be sandwiched and stolen. The code snippets which are vulnerable to this attack are ConvexSpell.sol#L147-L230 and CurveSpell.sol#L143-L223. The bug was found by 0x52, Breeje, Ch_301, and n1punp. The recommended solution is to allow users to specify a minimum out.

**Tags:** Slippage, Sandwich Attack, Flash Loan

**Links:** [GitHub](https://github.com/sherlock-audit/2023-04-blueberry-judging/issues/124)

---

### 10. H-3: Users are forced to swap all reward tokens with no slippage protection

**Impact:** 🔴 HIGH

**Audit Firm:** Sherlock
**Protocol:** Blueberry Update
**Quality Score:** 0/5
**Rarity Score:** 0/5
**Report Date:** Invalid Date
**Finders:** Bauer, 0x52, J4de, n1punp, nobody2018, Breeje, ctf\_sec

**Summary:**

This bug report is about an issue found in the AuraSpell.sol contract, which is part of the Sherlock Audit project. The issue is that users are forced to swap all reward tokens with no slippage protection. This was found through manual review by 0x52, Bauer, Breeje, J4de, ctf_sec, n1punp, and nobody2018.

The vulnerability detail is that the code snippet for the swap function does not allow users to specify any slippage values, meaning that deposits can be sandwiched and stolen. This can result in all reward tokens being sandwiched and stolen. The code snippet for the vulnerability can be found in AuraSpell.sol#L193-L203 and the full code snippet can be found in AuraSpell.sol#L149-L224.

The impact of this vulnerability is that all reward tokens can be sandwiched and stolen. The recommendation for this issue is to allow users to specify slippage parameters for all reward tokens.

**Tags:** Slippage, Deposit/Reward tokens

**Links:** [GitHub](https://github.com/sherlock-audit/2023-04-blueberry-judging/issues/121)

---

### 11. Overpayment of one side of LP Pair onJoinPool due to sandwich or user error

**Impact:** 🔴 HIGH

**Audit Firm:** Spearbit
**Protocol:** Cron Finance
**Quality Score:** 5/5
**Rarity Score:** 5/5
**Report Date:** Invalid Date
**Finders:** Christos Papakonstantinou, M4rio.eth, Noah Marconi, Calvin Boehr, Kurt Barry

**Summary:**

This bug report is about an attack on a pool of two tokens. The attack is executed by an attacker with a large amount of liquidity, who uses a swap of 5 106 of one of the tokens to distort the pool, resulting in the LP losing far more than the attacker. This attack is especially profitable for smaller pools, but can be prevented by allowing LPs to specify slippage tolerance on both join and exit. 

The Twamm team addressed this issue by adding minimum price arguments to allow users to specify asymmetric limits if desired. For the exit use case, they added a test to illustrate that users can reject liquidation during undesirable price movements. The Spearbit team also confirmed that the issue had been addressed.

**Tags:** Slippage

**Links:** [Source](https://github.com/spearbit/portfolio/blob/master/pdfs/CronFinance-Spearbit-Security-Review.pdf) | [PDF](https://solodit-bucket.s3.amazonaws.com/storage/reports/spearbit/CronFinance-Spearbit-Security-Review.pdf)

---

### 12. H-11: The deposit / withdraw / trade transaction lack of expiration timestamp check and slippage control

**Impact:** 🔴 HIGH

**Audit Firm:** Sherlock
**Protocol:** Ajna
**Quality Score:** 4/5
**Rarity Score:** 4/5
**Report Date:** Invalid Date
**Finders:** ctf\_sec

**Summary:**

This bug report is about the lack of expiration timestamp check and slippage control for deposit, withdraw and trade transactions in the Uniswap V2 contract. It was found by ctf\_sec and is located in the Pool.sol file.

The lack of a deadline check can cause a transaction to be pending for a long time, which harms the user's position as the trade can be done at a sub-optimal price. The lack of a slippage control can result in the user receiving a lower amount of the token they wanted to trade.

The impact of this issue is that lenders may not be able to withdraw their tokens if it moves the LUP (lowest utilized price) below the borrower's threshold price. This can also result in a borrower being liquidated if they are undercollateralized with respect to the LUP.

The code snippet needed to fix this issue is located in the Pool.sol file. The recommendation is to add a deadline check and slippage control.

**Tags:** Slippage, Deadline

**Links:** [GitHub](https://github.com/sherlock-audit/2023-01-ajna-judging/issues/39)

---

### 13. H-6: User specified slippage allows frontrunning

**Impact:** 🔴 HIGH

**Audit Firm:** Sherlock
**Protocol:** UXD Protocol
**Quality Score:** 4/5
**Rarity Score:** 4/5
**Report Date:** Invalid Date
**Finders:** keccak123, zeroknots, HollaDieWaldfee, yixxas, koxuan, GimelSec, peanuts, wagmi, HonorLt, minhtrng, jonatascm, ck

**Summary:**

This bug report is about the vulnerability found in the `rebalance` and `rebalanceLite` functions of UXDController. These functions can be called by any user and the funds are taken from a user-specified `account` address. If this address has a non-zero approval for PerpDepository, a frontrunner can use `rebalance` to transfer funds and profit by sandwiching the Uniswap pool swap. This will lead to the user losing value. Manual review was used to detect the vulnerability. The bug was fixed in the same PR as #288. The recommendation for this bug is that `rebalance` and `rebalanceLite` should use `msg.sender` to replace the function argument account address.

**Tags:** Slippage, Front-Running

**Links:** [GitHub](https://github.com/sherlock-audit/2023-01-uxd-judging/issues/192)

---

### 14. H-7: User specified slippage allows frontrunning

**Impact:** 🔴 HIGH

**Audit Firm:** Sherlock
**Protocol:** UXD Protocol
**Quality Score:** 2.6666666666666665/5
**Rarity Score:** 4/5
**Report Date:** Invalid Date
**Finders:** keccak123, zeroknots, HollaDieWaldfee, yixxas, koxuan, GimelSec, peanuts, wagmi, HonorLt, minhtrng, jonatascm, ck

**Summary:**

This bug report is about the vulnerability of the `rebalance` and `rebalanceLite` functions in UXDController. It was found by HonorLt, minhtrng, jonatascm, koxuan, yixxas, wagmi, ck, HollaDieWaldfee, zeroknots, GimelSec, peanuts, and keccak123. The issue is that `rebalance` and `rebalanceLite` can be called by any user and assets are taken from a user-specified `account` address, which has approved PerpDepository. This allows for a frontrunner to use `rebalance` to transfer funds and profit by sandwiching the Uniswap pool swap. This could lead to an account that is used in `rebalance` losing value. The code snippet provided is from PerpDepository.sol line 446. The recommendation is to use `msg.sender` to replace the function argument account address. WarTech9 mentioned that this was a duplicate of issue #288.

**Tags:** Slippage, Front-Running

**Links:** [GitHub](https://github.com/sherlock-audit/2023-01-uxd-judging/issues/192)

---

### 15. Users are forced to accept any slippage on the destination chain

**Impact:** 🔴 HIGH

**Audit Firm:** Spearbit
**Protocol:** Connext
**Quality Score:** 5/5
**Rarity Score:** 4/5
**Report Date:** Invalid Date
**Finders:** Xiaoming90, Blockdev, Gerard Persoon, Sawmon and Natalie, Csanuragjain

**Summary:**

This bug report is about a high risk issue with the BridgeFacet.sol codebase. The documentation mentions a cancel function on the destination domain, which would allow users to send funds back to the origin domain if they don't want to accept the high slippage rate on the destination domain. However, this feature is not found in the current codebase. This means that users may be stuck with the high slippage rate. To solve this issue, the cancel function should be implemented on the destination domain. The bug has been solved in PR 2456 and verified by Spearbit.

**Tags:** Slippage, Bridge

**Links:** [Source](https://github.com/spearbit/portfolio/blob/master/pdfs/ConnextNxtp-Spearbit-Security-Review.pdf) | [PDF](https://solodit-bucket.s3.amazonaws.com/storage/reports/spearbit/ConnextNxtp-Spearbit-Security-Review.pdf)

---

### 16. deposit and withdraw functions are susceptible to sandwich attacks

**Impact:** 🔴 HIGH

**Audit Firm:** Spearbit
**Protocol:** Gauntlet
**Quality Score:** 5/5
**Rarity Score:** 4.5/5
**Report Date:** Invalid Date
**Finders:** Emanuele Ricci, Eric Wang, Gerard Persoon

**Summary:**

This bug report is about a vulnerability called sandwich attacks in the AeraVaultV1.sol smart contracts. It is considered a high risk vulnerability as it allows an attacker to extract value from deposits. The attack works by the attacker front-running and back-running a transaction from the treasury, thereby manipulating the spot price of a token in the Balancer pool and profiting from it.

The report suggests a few potential mitigations for this vulnerability, such as adopting a two-step deposit and withdraw model, avoiding deposits or withdrawals if the pool balance has changed in the same block, adding price boundaries as parameters to the deposit() and withdraw() functions, and using Flashbots to reduce sandwiching probabilities.

Gauntlet and Spearbit have taken some actions to address this vulnerability in AeraVaultV1.sol. They have advised treasuries against making large deposits, offered an option to reject the transaction if balances have been changed in the block, and advised treasuries to use flash bots when possible. These actions are procedural and not technical in nature.

**Tags:** Slippage, Sandwich Attack

**Links:** [Source](https://github.com/spearbit/portfolio/blob/master/pdfs/Gauntlet-Spearbit-Security-Review.pdf) | [PDF](https://solodit-bucket.s3.amazonaws.com/storage/reports/spearbit/Gauntlet-Spearbit-Security-Review.pdf)

---

### 17. H-5: Settlement slippage is not implemented correctly which may lead to some vaults being impossible to settle

**Impact:** 🔴 HIGH

**Audit Firm:** Sherlock
**Protocol:** Notional
**Quality Score:** 5/5
**Rarity Score:** 3/5
**Report Date:** Invalid Date
**Finders:** 0x52

**Summary:**

A bug has been identified in the contract for Settlement Slippage which may lead to some vaults becoming impossible to settle. The contract is supposed to implement a different max slippage value depending on the settlement type, but these values have no impact because they are never actually applied. Instead, regardless of settlement type or function inputs, max slippage will always be limited to the value of balancerPoolSlippageLimitPercent. This can be problematic because the default value allows only 1% slippage. If settlement slippage goes outside of 1%, then settlement of any kind will become impossible. 

The bug has been identified in the Boosted3TokenAuraHelper.sol#L95-L99 code snippet. The code snippet first sets params.minPrimary overwriting any value from function input and then adjusts minPrimary by balancerPoolSlippageLimitPercent. However, it doesn't ever adjust it by Params.DynamicTradeParams.oracleSlippagePercent, meaning that the max possible slippage regardless of settlement type is limited to the slippage allowed by balancerPoolSlippageLimitPercent. If the max slippage ever goes outside of this range, then settlement of any kind will become impossible.

The impact of this bug is that settlement may become impossible. A manual review was used to identify the bug. The recommendation is to validate Params.DynamicTradeParams.oracleSlippagePercent in every scenario before Boosted3TokenAuraHelper#_executeSettlement is called, and to apply these values when calculating minPrimary. This has been discussed with a developer, who has noted that balancerPoolSlippageLimitPercent is configurable and can be updated by governance.

**Tags:** Slippage

**Links:** [GitHub](https://github.com/sherlock-audit/2022-09-notional-judging/issues/42)

---

### 18. Routers are exposed to extreme slippage if they attempt to repay debt before being reconciled

**Impact:** 🔴 HIGH

**Audit Firm:** Spearbit
**Protocol:** Connext
**Quality Score:** 5/5
**Rarity Score:** 4/5
**Report Date:** Invalid Date
**Finders:** 0xLeastwood, Jonah1005

**Summary:**

This bug report describes a potential issue with the protocol used in NomadFacet.sol and AssetLogic.sol. The issue occurs when routers are reconciled, and the local asset needs to be exchanged for the adopted asset. The problem is that the two key arguments, _amount and _maxIn, diverge from each other, allowing value to be extracted in the form of slippage. As a result, routers may receive less than the amount of liquidity they initially provided, leading to router insolvency. The recommendation is to use some sort of user-defined slippage amount, or to restrict who can use Aave unbacked debt. The issue was solved in PR 1585 and verified by Spearbit.

**Tags:** Slippage, Business Logic

**Links:** [Source](https://github.com/spearbit/portfolio/blob/master/pdfs/Connext-Spearbit-Security-Review.pdf) | [PDF](https://solodit-bucket.s3.amazonaws.com/storage/reports/spearbit/Connext-Spearbit-Security-Review.pdf)

---

### 19. [H-01] Hard-coded slippage may freeze user funds during market turbulence

**Impact:** 🔴 HIGH

**Audit Firm:** Code4rena
**Protocol:** Sturdy
**Quality Score:** 3/5
**Rarity Score:** 3/5
**Report Date:** Invalid Date
**Finders:** IllIllI, jonah1005, Picodes, sorrynotsorry, WatchPug, berndartmueller

**Summary:**

This bug report is about two lines of code in two different smart contracts. In GeneralVault.sol#L125, a hardcoded slippage control of 99% is set. This means that if the underlying yield tokens price goes down, users' funds may get locked. In LidoVault.sol#L130-L137, the withdrawal of the lidoVault takes a swap from the curve pool. However, the vault can not withdraw at the current market. This is considered a high-risk issue.

Two recommended mitigation steps have been suggested. The first is to let users determine the maximum slippage they're willing to take, while the protocol front-end should set the recommended value for them. The second is to have a slippage control parameters that's set by the operator. The first option is preferred as the market may corrupt quickly before the operator takes action.

**Tags:** Slippage

**Links:** [Source](https://code4rena.com/reports/2022-05-sturdy) | [GitHub](https://github.com/code-423n4/2022-05-sturdy-findings/issues/133)

---

### 20. [H-01] Minting and burning synths exposes users to unlimited slippage

**Impact:** 🔴 HIGH

**Audit Firm:** Code4rena
**Protocol:** Vader Protocol
**Quality Score:** 3/5
**Rarity Score:** 3/5
**Report Date:** Invalid Date
**Finders:** cmichel, TomFrenchBlockchain

**Summary:**

This bug report is about a vulnerability in the VaderPool. It was discovered that the amount of synths minted or assets received when minting or burning synths can be manipulated to an unlimited extent by manipulating the reserves of the pool. This means that a user can't specify the minimum amount of synth that they would accept, and a frontrunner can manipulate the reserves of the pool in order to make foreignAsset appear more valuable than it really is. As a result, the user receives synths which are worth much less than what nativeDeposit is worth. This is equivalent to a swap without a slippage limit. Burning synths also runs the same process in behalf, so manipulating the pool in the opposite direction will result in the user getting fewer of nativeAsset than they expect. To mitigate this vulnerability, it is recommended to add a argument for the minimum amount of synths to mint or nativeAsset to receive.

**Tags:** Slippage

**Links:** [Source](https://code4rena.com/reports/2021-11-vader) | [GitHub](https://github.com/code-423n4/2021-11-vader-findings/issues/2)

---

### 21. [H-07] Missing slippage checks

**Impact:** 🔴 HIGH

**Audit Firm:** Code4rena
**Protocol:** Spartan Protocol
**Quality Score:** 5/5
**Rarity Score:** 5/5
**Report Date:** Invalid Date
**Finders:** tensors, cmichel

**Summary:**

This bug report concerns a vulnerability in the Router and Pool of a system that does not have any slippage checks to compare the swap/liquidity results with a minimum swap/liquidity value. This means that users can be frontrun and receive a worse price than expected, and there is no protection or minimum return amount for the trade transaction to be valid. This can lead to a loss of user funds.

The recommended mitigation step is to add some sort of protection for the user such that they receive their desired amounts, and to add a minimum return amount for all swap and liquidity provisions/removals to all Router functions. This will help to ensure that users receive the desired price and that their funds are not lost due to frontrunning or other malicious activities.

**Tags:** Slippage, Swap

**Links:** [Source](https://code4rena.com/reports/2021-07-spartan) | [GitHub](https://github.com/code-423n4/2021-07-spartan-findings/issues/171)

---

