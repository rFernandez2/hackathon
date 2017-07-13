import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ArticleObj } from './articleobj';


const ARTICLES =
   { "articles":[{"brand": "nytimes", "title": "Yellen Says Economy Is Robust but Fed Will Stay Flexible", "url": "https://www.nytimes.com/2017/07/12/business/yellen-federal-reserve-congress-economy.html?partner=rss&amp;emc=rss", "image_url": "https://static01.nyt.com/images/2017/07/13/business/13FED2/13FED2-facebookJumbo.jpg", "sentiment": "-0.39", "category": "monetary policy"}, {"brand": "nytimes", "title": "Yellen Says Economy Is Robust but Fed Will Stay Flexible", "url": "https://www.nytimes.com/2017/07/12/business/yellen-federal-reserve-congress-economy.html", "image_url": "https://static01.nyt.com/images/2017/07/13/business/13FED2/13FED2-facebookJumbo.jpg", "sentiment": "-0.39", "category": "monetary policy"}, {"brand": "bloomberg", "title": "Yellen's Take on Inflation Shifts Subtly in Remarks to Congress", "url": "https://www.bloomberg.com/news/articles/2017-07-12/yellen-s-take-on-inflation-shifts-subtly-in-remarks-to-congress", "image_url": "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iPdYYRoVKAao/v0/1200x800.jpg", "sentiment": "-1.41", "category": "monetary policy"}, {"brand": "bloomberg", "title": "U.S. Stocks, Bonds Jump on Go-Slow Fed; Oil Climbs: Markets Wrap", "url": "http://bloomberg.com/news/articles/2017-07-11/asia-stocks-to-slip-with-attention-back-on-yellen-markets-wrap", "image_url": "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iNMnkPN8yG9k/v0/1200x801.jpg", "sentiment": "-1.29", "category": "monetary policy"}, {"brand": "bloomberg", "title": "U.S. Stocks, Bonds Jump on Go-Slow Fed; Oil Climbs: Markets Wrap", "url": "https://www.bloomberg.com/news/articles/2017-07-11/asia-stocks-to-slip-with-attention-back-on-yellen-markets-wrap", "image_url": "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iNMnkPN8yG9k/v0/1200x801.jpg", "sentiment": "-1.29", "category": "monetary policy"}, {"brand": "bloomberg", "title": "Traders Welcome Back Stock Market Momentum", "url": "http://bloomberg.com/news/videos/2017-07-12/traders-embrace-a-return-of-stock-market-momentum-video", "image_url": "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iZmcxUlTSbpg/v5/-1x-1.jpg", "sentiment": "0", "category": "equity"}, {"brand": "bloomberg", "title": "That's Not Private Equity, That's a Pension Fund", "url": "https://www.bloomberg.com/news/articles/2017-07-12/that-s-not-private-equity-that-s-a-pension-fund", "image_url": "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/ifuNlRqoc1U4/v0/1200x800.jpg", "sentiment": "1.74", "category": "equity"}, {"brand": "bloomberg", "title": "Suddenly the U.S. Is Exporting More Crude Than a Bunch of OPEC Members", "url": "https://www.bloomberg.com/news/articles/2017-06-28/suddenly-the-u-s-is-exporting-more-crude-than-a-bunch-of-opec-members", "image_url": "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/ikQeeXbchWpI/v0/1200x630.jpg", "sentiment": "-0.8", "category": "oil"}, {"brand": "seekingalpha", "title": "First Majestic Silver: Not Good News", "url": "https://seekingalpha.com/article/4087323-first-majestic-silver-good-news?source=feed_all_articles", "image_url": "https://static1.seekingalpha.com/uploads/2017/7/12/25765463-14998835441370556.png", "sentiment": "2.0", "category": "equity"}, {"brand": "seekingalpha", "title": "Dealing With A Dividend Cut In Your CEF Portfolio", "url": "https://seekingalpha.com/article/4087315-dealing-dividend-cut-cef-portfolio?source=feed_all_articles", "image_url": "https://static.seekingalpha.com/uploads/2017/7/12/saupload_pzc.png", "sentiment": "2.13", "category": "fixed income"}, {"brand": "seekingalpha", "title": "An Oil Price Reversal Should Benefit TIPS", "url": "https://seekingalpha.com/article/4087314-oil-price-reversal-benefit-tips?source=feed_all_articles", "image_url": "https://static.seekingalpha.com/uploads/2017/7/12/41231025-14998819275307908.png", "sentiment": "-2.37", "category": "oil"}, {"brand": "seekingalpha", "title": "Between A Rock And A Hard Place: Did The Fed Just Blink?", "url": "https://seekingalpha.com/article/4087313-rock-hard-place-fed-just-blink?source=feed_all_articles", "image_url": "https://static1.seekingalpha.com/images/marketing_images/bull_bear/bull/bull_10.png", "sentiment": "-0.97", "category": "equity"}, {"brand": "seekingalpha", "title": "Will Gold And Silver Ever Be Free Of The Fed?", "url": "https://seekingalpha.com/article/4087311-will-gold-silver-ever-free-fed?source=feed_all_articles", "image_url": "https://static1.seekingalpha.com/images/marketing_images/mining_minerals/silver_coin_cc0.png", "sentiment": "2.5", "category": "monetary policy"}, {"brand": "seekingalpha", "title": "Forget Chevron, Here's A Higher Yielding, Faster Growing, And Much Safer Income Investment", "url": "http://seekingalpha.com/article/4087072-forget-chevron-higher-yielding-faster-growing-much-safer-income-investment", "image_url": "https://static3.seekingalpha.com/uploads/2017/7/11/47572571-14998049332008924.jpg", "sentiment": "1.97", "category": "oil"}, {"brand": "seekingalpha", "title": "Stocks, bonds, gold gain as Yellen testifies", "url": "http://seekingalpha.com/news/3278218-stocks-bonds-gold-gain-yellen-testifies", "image_url": "https://static.seekingalpha.com/assets/og_image_410-b8960ce31ec84f7f12dba11a09fc1849b69b234e0f5f39d7c62f46f8692e58a5.png", "sentiment": "-0.9", "category": "monetary policy"}, {"brand": "seekingalpha", "title": "Yellen notes \"uncertainty\" over inflation - gold and bond prices rise", "url": "http://seekingalpha.com/news/3278163-yellen-notes-uncertainty-inflation-gold-bond-prices-rise", "image_url": "https://static.seekingalpha.com/assets/og_image_410-b8960ce31ec84f7f12dba11a09fc1849b69b234e0f5f39d7c62f46f8692e58a5.png", "sentiment": "-1.49", "category": "monetary policy"}, {"brand": "seekingalpha", "title": "An Oil Price Reversal Should Benefit TIPS", "url": "http://seekingalpha.com/article/4087314-oil-price-reversal-benefit-tips", "image_url": "https://static.seekingalpha.com/uploads/2017/7/12/41231025-14998819275307908.png", "sentiment": "-2.37", "category": "oil"}, {"brand": "seekingalpha", "title": "Between A Rock And A Hard Place: Did The Fed Just Blink?", "url": "http://seekingalpha.com/article/4087313-rock-hard-place-fed-just-blink", "image_url": "https://static1.seekingalpha.com/images/marketing_images/bull_bear/bull/bull_10.png", "sentiment": "-0.97", "category": "equity"}, {"brand": "seekingalpha", "title": "Will Gold And Silver Ever Be Free Of The Fed?", "url": "http://seekingalpha.com/article/4087311-will-gold-silver-ever-free-fed", "image_url": "https://static1.seekingalpha.com/images/marketing_images/mining_minerals/silver_coin_cc0.png", "sentiment": "2.5", "category": "monetary policy"}, {"brand": "seekingalpha", "title": "Using Leverage In Retirement To Reduce Risk And/Or Increase Safe Withdrawal Rates", "url": "http://seekingalpha.com/article/4087272-using-leverage-retirement-reduce-risk-increase-safe-withdrawal-rates", "image_url": "https://static.seekingalpha.com/uploads/2017/6/25/84905-14984465159616454_origin.png", "sentiment": "-0.59", "category": "equity"}, {"brand": "seekingalpha", "title": "Dealing With A Dividend Cut In Your CEF Portfolio", "url": "http://seekingalpha.com/article/4087315-dealing-dividend-cut-cef-portfolio", "image_url": "https://static.seekingalpha.com/uploads/2017/7/12/saupload_pzc.png", "sentiment": "2.13", "category": "fixed income"}, {"brand": "seekingalpha", "title": "Endeavour Silver: You Are All Missing This", "url": "http://seekingalpha.com/article/4087267-endeavour-silver-missing", "image_url": "https://static3.seekingalpha.com/images/marketing_images/banks_credit_cards/silver_piggybank_slot.jpeg", "sentiment": "1.75", "category": "gold"}, {"brand": "seekingalpha", "title": "Buckle's Future: Cheap and Cheaper", "url": "http://seekingalpha.com/article/4087148-buckles-future-cheap-cheaper", "image_url": "https://static2.seekingalpha.com/images/marketing_images/retail/sale_cc0.png", "sentiment": "-1.33", "category": "equity"}, {"brand": "seekingalpha", "title": "Competition Is Bad For Stocks - Cramer's Mad Money (7/11/17)", "url": "http://seekingalpha.com/article/4087143-competition-bad-stocks-cramers-mad-money-7-11-17", "image_url": "https://static.seekingalpha.com/assets/og_image_410-b8960ce31ec84f7f12dba11a09fc1849b69b234e0f5f39d7c62f46f8692e58a5.png", "sentiment": "-0.93", "category": "equity"}, {"brand": "seekingalpha", "title": "ConocoPhillips Looks Strong Despite The Potential Oil Slump", "url": "http://seekingalpha.com/article/4087116-conocophillips-looks-strong-despite-potential-oil-slump", "image_url": "https://static.seekingalpha.com/assets/og_image_410-b8960ce31ec84f7f12dba11a09fc1849b69b234e0f5f39d7c62f46f8692e58a5.png", "sentiment": "1.63", "category": "oil"}, {"brand": "seekingalpha", "title": "AV Homes: Price Target Raised", "url": "http://seekingalpha.com/article/4087083-av-homes-price-target-raised", "image_url": "https://static.seekingalpha.com/uploads/2017/7/11/47914664-14997624376164932.png", "sentiment": "2.02", "category": "equity"}, {"brand": "seekingalpha", "title": "This Safe Bank Is A Buy Under $50", "url": "http://seekingalpha.com/article/4086970-safe-bank-buy-50", "image_url": "https://static3.seekingalpha.com/uploads/2017/7/9/43793356-14996203509855976.png", "sentiment": "1.15", "category": "equity"}, {"brand": "seekingalpha", "title": "On Sale At The Gap: A Yield Above 4%", "url": "http://seekingalpha.com/article/4086964-sale-gap-yield-4-percent", "image_url": "https://static3.seekingalpha.com/images/marketing_images/retail/0212150_2590_d31a_407035354d8ee37b.jpeg", "sentiment": "1.61", "category": "equity"}, {"brand": "seekingalpha", "title": "My Journey Towards Financial Independence: 72 Stock June Portfolio Update", "url": "http://seekingalpha.com/article/4086867-journey-towards-financial-independence-72-stock-june-portfolio-update", "image_url": "https://static1.seekingalpha.com/uploads/2017/7/8/38506186-14995485656675978.png", "sentiment": "1.18", "category": "equity"}, {"brand": "seekingalpha", "title": "I Bought The Only Undervalued Mortgage REIT", "url": "http://seekingalpha.com/article/4086876-bought-undervalued-mortgage-reit", "image_url": "https://static.seekingalpha.com/uploads/2017/7/14527192_14997213601792_rId9_thumb.jpg", "sentiment": "2.2", "category": "fixed income"}, {"brand": "seekingalpha", "title": "Sand In My Shoes - Improving Income For The Long Term With Home Depot", "url": "http://seekingalpha.com/article/4086869-sand-shoes-improving-income-long-term-home-depot", "image_url": "https://static2.seekingalpha.com/images/marketing_images/industry_construction/building_1080603_960_720.jpeg", "sentiment": "1.2", "category": "equity"}, {"brand": "seekingalpha", "title": "Dividends & Income Digest: Quarterly Review", "url": "http://seekingalpha.com/article/4086845-dividends-and-income-digest-quarterly-review", "image_url": "https://static.seekingalpha.com/assets/og_image_410-b8960ce31ec84f7f12dba11a09fc1849b69b234e0f5f39d7c62f46f8692e58a5.png", "sentiment": "1.59", "category": "equity"}, {"brand": "seekingalpha", "title": "First Majestic Silver: Not Good News", "url": "http://seekingalpha.com/article/4087323-first-majestic-silver-good-news", "image_url": "https://static1.seekingalpha.com/uploads/2017/7/12/25765463-14998835441370556.png", "sentiment": "2.0", "category": "equity"}, {"brand": "seekingalpha", "title": "Noble Up Because Of Goldilocks While HSBC Palm Oil Policy Drives RSPO Inquiry", "url": "http://seekingalpha.com/article/4087302-noble-goldilocks-hsbc-palm-oil-policy-drives-rspo-inquiry", "image_url": "https://static.seekingalpha.com/assets/og_image_410-b8960ce31ec84f7f12dba11a09fc1849b69b234e0f5f39d7c62f46f8692e58a5.png", "sentiment": "3.39", "category": "oil"}, {"brand": "seekingalpha", "title": "Profit From A Fed That Clearly Has Decisiveness Issues", "url": "http://seekingalpha.com/article/4087295-profit-fed-clearly-decisiveness-issues", "image_url": "https://static.seekingalpha.com/assets/og_image_410-b8960ce31ec84f7f12dba11a09fc1849b69b234e0f5f39d7c62f46f8692e58a5.png", "sentiment": "1.87", "category": "monetary policy"}, {"brand": "seekingalpha", "title": "Will Low Inflation Delay Fed Rate Hikes?", "url": "http://seekingalpha.com/article/4087291-will-low-inflation-delay-fed-rate-hikes", "image_url": "https://static.seekingalpha.com/uploads/2017/7/12/saupload_wages.2017-07-12.png", "sentiment": "-1.68", "category": "monetary policy"}, {"brand": "seekingalpha", "title": "Barnes & Noble Education's (BNED) CEO Max Roberts on Q4 2017 Results - Earnings Call Transcript", "url": "http://seekingalpha.com/article/4087281-barnes-and-noble-educations-bned-ceo-max-roberts-q4-2017-results-earnings-call-transcript", "image_url": "https://static.seekingalpha.com/assets/og_image_410-b8960ce31ec84f7f12dba11a09fc1849b69b234e0f5f39d7c62f46f8692e58a5.png", "sentiment": "2.11", "category": "fixed income"}, {"brand": "seekingalpha", "title": "Top 5 Things To Know In The Market On Wednesday", "url": "http://seekingalpha.com/article/4087190-top-5-things-know-market-wednesday", "image_url": "https://static.seekingalpha.com/assets/og_image_410-b8960ce31ec84f7f12dba11a09fc1849b69b234e0f5f39d7c62f46f8692e58a5.png", "sentiment": "-0.79", "category": "equity"}, {"brand": "seekingalpha", "title": "Will BoC Poloz Lift The Loonie Higher?", "url": "http://seekingalpha.com/article/4087140-will-boc-poloz-lift-loonie-higher", "image_url": "https://static1.seekingalpha.com/uploads/2017/7/12/saupload_BCO_USD_2017-07-11_2d_m.png", "sentiment": "-0.73", "category": "oil"}, {"brand": "seekingalpha", "title": "Rate Differentials Hinders Yen", "url": "http://seekingalpha.com/article/4086847-rate-differentials-hinders-yen", "image_url": "https://static3.seekingalpha.com/uploads/2017/7/11/saupload_EUR_USD_2017-07-10_2d_m.png", "sentiment": "-0.49", "category": "oil"}, {"brand": "marketwatch", "title": "How the rise of drones is posing a major security nightmare", "url": "http://www.marketwatch.com/video/sectorwatch", "image_url": "http://m.wsj.net/video/20170710/07102017_mw_dedrone/07102017_mw_dedrone_1280x720.jpg", "sentiment": "0", "category": "oil"}, {"brand": "marketwatch", "title": "Oil prices end at their highest level in nearly a week", "url": "http://www.marketwatch.com/story/oil-prices-end-at-their-highest-level-in-nearly-a-week-2017-07-12", "image_url": "http://mw3.wsj.net/mw5/content/logos/mw_logo_social.png", "sentiment": "0", "category": "oil"}, {"brand": "marketwatch", "title": "Stock market gains on dovish Yellen", "url": "http://www.marketwatch.com/story/us-stock-futures-in-holding-pattern-as-traders-wait-for-yellen-2017-07-12", "image_url": "http://s.marketwatch.com/public/resources/MWimages/MW-DZ169_yellen_ZG_20151112052901.jpg", "sentiment": "1.41", "category": "monetary policy"}, {"brand": "marketwatch", "title": "Reacting to Yellen, traders may get to right place for wrong reason", "url": "http://www.marketwatch.com/story/reacting-to-yellen-traders-may-get-to-right-place-for-wrong-reason-2017-07-12", "image_url": "http://s.marketwatch.com/public/resources/MWimages/MW-FQ139_yellen_MG_20170712131828.jpg", "sentiment": "-0.51", "category": "monetary policy"}, {"brand": "marketwatch", "title": "Yellen says not many more rate hikes needed: House testimony live blog and video", "url": "http://blogs.marketwatch.com/capitolreport/2017/07/12/live-blog-and-video-of-yellens-testimony-before-house-panel/", "image_url": "http://si.wsj.net/public/resources/MWimages/MW-FO480_yellen_MG_20170614155856.jpg", "sentiment": "1.24", "category": "monetary policy"}, {"brand": "marketwatch", "title": "Jamie Dimon says QE unwind could catch investors by surprise", "url": "http://www.marketwatch.com/story/jamie-dimon-says-qe-unwind-could-catch-investors-by-surprise-2017-07-11", "image_url": "http://s.marketwatch.com/public/resources/MWimages/MW-FQ085_dimon__ZG_20170711174502.jpg", "sentiment": "0.05", "category": "monetary policy"}, {"brand": "marketwatch", "title": "Buy these 3 energy winners \u2014 and avoid this trio of losers", "url": "http://www.marketwatch.com/story/buy-these-3-energy-winners-and-avoid-this-trio-of-losers-2017-07-12", "image_url": "http://s.marketwatch.com/public/resources/MWimages/MW-FQ132_oil_pu_ZG_20170712122242.jpg", "sentiment": "-1.61", "category": "oil"}, {"brand": "marketwatch", "title": "Technical trading: These four stocks are breaking out of their pattern", "url": "http://www.marketwatch.com/story/technical-trading-these-four-stocks-are-breaking-out-of-their-pattern-2017-07-12", "image_url": "http://s.marketwatch.com/public/resources/MWimages/MW-EX699_biotec_ZG_20161012152107.jpg", "sentiment": "1.02", "category": "equity"}, {"brand": "marketwatch", "title": "New fears of a possible Trump impeachment could move stocks, bonds and gold", "url": "http://www.marketwatch.com/story/new-fears-of-a-possible-trump-impeachment-could-move-stocks-bonds-and-gold-2017-07-11", "image_url": "http://s.marketwatch.com/public/resources/MWimages/MW-FJ523_17trum_ZG_20170402171741.jpg", "sentiment": "1.92", "category": "gold"}, {"brand": "marketwatch", "title": "Vanguard may solve an indexing problem it helped create", "url": "http://www.marketwatch.com/story/vanguard-may-solve-an-indexing-problem-it-helped-create-2017-07-12", "image_url": "http://s.marketwatch.com/public/resources/MWimages/MW-EY952_math_f_ZG_20161028080627.jpg", "sentiment": "-1.45", "category": "equity"}, {"brand": "marketwatch", "title": "Hedge fund manager who scored a 78% annual return with Apple and Amazon is short-selling Netflix", "url": "http://www.marketwatch.com/story/hedge-fund-manager-who-scored-a-78-annual-return-with-apple-and-amazon-is-short-selling-netflix-2017-07-11", "image_url": "http://s.marketwatch.com/public/resources/MWimages/MW-FN062_netfli_MG_20170523143000.jpg", "sentiment": "-0.1", "category": "hedge fund"}, {"brand": "marketwatch", "title": "Yellen: Inflation Should Rebound, Fed Could Alter Policy", "url": "http://www.marketwatch.com/video/yellen-inflation-should-rebound-fed-could-alter-policy/A89907A7-D206-423C-ABD1-14F004B5A5B5.html", "image_url": "http://m.wsj.net/video/20170712/071217yellen1/071217yellen1_1280x720.jpg", "sentiment": "0", "category": "monetary policy"}, {"brand": "marketwatch", "title": "Dollar turns higher after Yellen calls for gradual rate hikes", "url": "http://www.marketwatch.com/story/dollar-under-pressure-with-all-eyes-on-yellen-loonie-waits-for-bank-of-canada-move-2017-07-12", "image_url": "http://s.marketwatch.com/public/resources/MWimages/MW-EH777_fedyel_ZG_20160313203307.jpg", "sentiment": "-1.88", "category": "monetary policy"}, {"brand": "marketwatch", "title": "Vanguard may solve an indexing problem it helped create", "url": "http://www.marketwatch.com/story/vanguard-may-solve-an-indexing-problem-it-helped-create-2017-07-12?mod=fa_center", "image_url": "http://s.marketwatch.com/public/resources/MWimages/MW-EY952_math_f_ZG_20161028080627.jpg", "sentiment": "-1.45", "category": "equity"}, {"brand": "marketwatch", "title": "Should I keep my 401(k) with my employer when I retire?", "url": "http://www.marketwatch.com/story/should-i-keep-my-401k-with-my-employer-when-i-retire-2017-07-10?mod=fa_center", "image_url": "http://s.marketwatch.com/public/resources/MWimages/MW-FP957_retire_ZG_20170710120621.jpg", "sentiment": "-0.58", "category": "equity"}, {"brand": "marketwatch", "title": "Fed\u2019s Beige Book says worker shortage hurts U.S. hiring", "url": "http://www.marketwatch.com/story/feds-beige-book-says-worker-shortage-limits-hiring-2017-07-12", "image_url": "http://s.marketwatch.com/public/resources/MWimages/MW-FL866_Brewer_ZG_20170504154930.jpg", "sentiment": "-1.76", "category": "monetary policy"}, {"brand": "marketwatch", "title": "Why picking stocks is only slightly better than playing the lottery", "url": "http://www.marketwatch.com/story/why-picking-stocks-is-only-slightly-better-than-playing-the-lottery-2017-06-28", "image_url": "http://s.marketwatch.com/public/resources/MWimages/MW-ED097_lotter_MG_20160112080243.jpg", "sentiment": "1.73", "category": "equity"}, {"brand": "marketwatch", "title": "Vanguard may solve an indexing problem it helped create", "url": "http://marketwatch.com/story/vanguard-may-solve-an-indexing-problem-it-helped-create-2017-07-12", "image_url": "http://s.marketwatch.com/public/resources/MWimages/MW-EY952_math_f_ZG_20161028080627.jpg", "sentiment": "-1.45", "category": "equity"}, {"brand": "marketwatch", "title": "Dow industrials tag all-time high, breakout attempt underway", "url": "http://marketwatch.com/story/dow-industrials-tag-all-time-high-breakout-attempt-underway-2017-07-12", "image_url": "http://mw3.wsj.net/mw5/content/logos/mw_logo_social.png", "sentiment": "0", "category": "equity"}, {"brand": "marketwatch", "title": "Be skeptical of active fund managers\u2019 new allure", "url": "http://marketwatch.com/story/dont-ditch-your-index-funds-just-yet-2017-03-06", "image_url": "http://s.marketwatch.com/public/resources/MWimages/MW-DH812_unicor_ZG_20150317101504.jpg", "sentiment": "1.35", "category": "equity"}, {"brand": "marketwatch", "title": "The stock market doesn\u2019t know you\u2019re a woman", "url": "http://marketwatch.com/story/the-stock-market-doesnt-know-youre-a-woman-2017-07-06", "image_url": "http://s.marketwatch.com/public/resources/MWimages/MW-FP675_workin_ZG_20170705114231.jpg", "sentiment": "1.06", "category": "equity"}, {"brand": "marketwatch", "title": "Gold and platinum are giving the all clear to stock market investors", "url": "http://marketwatch.com/story/gold-and-platinum-are-giving-the-all-clear-to-stock-market-investors-2017-07-11", "image_url": "http://s.marketwatch.com/public/resources/MWimages/MW-FP952_good_n_ZG_20170710104356.jpg", "sentiment": "1.9", "category": "gold"}, {"brand": "marketwatch", "title": "The party on Wall Street is just about over", "url": "http://marketwatch.com/story/the-party-on-wall-street-is-just-about-over-2015-11-10", "image_url": "http://s.marketwatch.com/public/resources/MWimages/MW-DY901_spx_11_ZG_20151110105024.png", "sentiment": "-0.46", "category": "equity"}, {"brand": "marketwatch", "title": "Stocks will be hungry for growth after emotional reset", "url": "http://marketwatch.com/story/stocks-will-be-hungry-for-growth-after-emotional-reset-2013-12-06", "image_url": "http://mw3.wsj.net/mw5/content/logos/mw_logo_social.png", "sentiment": "1.61", "category": "oil"}, {"brand": "marketwatch", "title": "Watch the Fed, not who wins the election", "url": "http://marketwatch.com/story/watch-the-fed-not-who-wins-the-election-2012-11-03", "image_url": "http://mw3.wsj.net/mw5/content/logos/mw_logo_social.png", "sentiment": "1.73", "category": "monetary policy"}, {"brand": "marketwatch", "title": "Buy these 3 energy winners \u2014 and avoid this trio of losers", "url": "http://marketwatch.com/story/buy-these-3-energy-winners-and-avoid-this-trio-of-losers-2017-07-12", "image_url": "http://s.marketwatch.com/public/resources/MWimages/MW-FQ132_oil_pu_ZG_20170712122242.jpg", "sentiment": "-1.61", "category": "oil"}, {"brand": "marketwatch", "title": "Lower oil prices set to slow 2018 growth in U.S. crude production, says EIA", "url": "http://marketwatch.com/story/lower-oil-prices-set-to-slow-2018-growth-in-us-crude-production-eia-2017-07-11", "image_url": "http://s.marketwatch.com/public/resources/MWimages/MW-FQ043_oil_ja_ZG_20170711130354.jpg", "sentiment": "-1.73", "category": "oil"}, {"brand": "marketwatch", "title": "Stock market gains on dovish Yellen", "url": "http://marketwatch.com/story/us-stock-futures-in-holding-pattern-as-traders-wait-for-yellen-2017-07-12?link=MW_popular", "image_url": "http://s.marketwatch.com/public/resources/MWimages/MW-DZ169_yellen_ZG_20151112052901.jpg", "sentiment": "1.41", "category": "monetary policy"}, {"brand": "marketwatch", "title": "New fears of a possible Trump impeachment could move stocks, bonds and gold", "url": "http://marketwatch.com/story/new-fears-of-a-possible-trump-impeachment-could-move-stocks-bonds-and-gold-2017-07-11?link=MW_popular", "image_url": "http://s.marketwatch.com/public/resources/MWimages/MW-FJ523_17trum_ZG_20170402171741.jpg", "sentiment": "1.92", "category": "gold"}, {"brand": "marketwatch", "title": "Oil prices end at their highest level in nearly a week", "url": "http://marketwatch.com/story/oil-prices-end-at-their-highest-level-in-nearly-a-week-2017-07-12?link=MW_latest_news", "image_url": "http://mw3.wsj.net/mw5/content/logos/mw_logo_social.png", "sentiment": "0", "category": "oil"}, {"brand": "marketwatch", "title": "Stock market gains on dovish Yellen", "url": "http://marketwatch.com/story/us-stock-futures-in-holding-pattern-as-traders-wait-for-yellen-2017-07-12?link=MW_latest_news", "image_url": "http://s.marketwatch.com/public/resources/MWimages/MW-DZ169_yellen_ZG_20151112052901.jpg", "sentiment": "1.41", "category": "monetary policy"}, {"brand": "marketwatch", "title": "Yellen: Inflation Should Rebound, Fed Could Alter Policy", "url": "http://www.marketwatch.com/videovideo/yellen-inflation-should-rebound-fed-could-alter-2017-07-12/A89907A7-D206-423C-ABD1-14F004B5A5B5.html", "image_url": "http://m.wsj.net/video/20170712/071217yellen1/071217yellen1_1280x720.jpg", "sentiment": "0", "category": "monetary policy"}, {"brand": "marketwatch", "title": "Fed\u2019s Beige Book says worker shortage hurts U.S. hiring", "url": "http://marketwatch.com/story/feds-beige-book-says-worker-shortage-limits-hiring-2017-07-12?link=MW_latest_news", "image_url": "http://s.marketwatch.com/public/resources/MWimages/MW-FL866_Brewer_ZG_20170504154930.jpg", "sentiment": "-1.76", "category": "monetary policy"}, {"brand": "marketwatch", "title": "Jamie Dimon says QE unwind could catch investors by surprise", "url": "http://marketwatch.com/story/jamie-dimon-says-qe-unwind-could-catch-investors-by-surprise-2017-07-11?link=MW_latest_news", "image_url": "http://s.marketwatch.com/public/resources/MWimages/MW-FQ085_dimon__ZG_20170711174502.jpg", "sentiment": "0.05", "category": "monetary policy"}, {"brand": "marketwatch", "title": "Reacting to Yellen, traders may get to right place for wrong reason", "url": "http://marketwatch.com/story/reacting-to-yellen-traders-may-get-to-right-place-for-wrong-reason-2017-07-12?link=MW_latest_news", "image_url": "http://s.marketwatch.com/public/resources/MWimages/MW-FQ139_yellen_MG_20170712131828.jpg", "sentiment": "-0.51", "category": "monetary policy"}, {"brand": "wsj", "title": "Energy News, Oil News, Gas News, Nuclear & Wind Industry, Gasoline at WSJ.com", "url": "https://www.wsj.com/news/business/energy-oil-gas", "image_url": "", "sentiment": "0", "category": "oil"}, {"brand": "wsj", "title": "Yellen: Inflation Should Rebound, but Fed Could Alter Policy if Softness Persists", "url": "https://www.wsj.com/articles/yellen-gradual-rate-increases-will-be-needed-to-sustain-economic-expansion-1499862633", "image_url": "https://si.wsj.net/public/resources/images/BN-UG181_YELLEN_SOC_20170712112930.jpg", "sentiment": "0", "category": "monetary policy"}, {"brand": "wsj", "title": "Yellen\u2019s Wish May Not Come True", "url": "https://www.wsj.com/articles/yellens-wish-may-not-come-true-1499877999?tesla=y", "image_url": "https://si.wsj.net/public/resources/images/BN-UG216_38XFy_TOP_20170712124019.jpg", "sentiment": "0", "category": "monetary policy"}, {"brand": "wsj", "title": "Stocks Climb as Investors Look to Yellen for Clues", "url": "https://www.wsj.com/articles/currency-gains-pressure-japan-australia-stocks-1499825411", "image_url": "https://si.wsj.net/public/resources/images/BN-UG089_panmkt_SOC_20170712034242.jpg", "sentiment": "0", "category": "equity"}, {"brand": "wsj", "title": "A Bond ETF for the Momentum-Hungry", "url": "https://www.wsj.com/articles/a-bond-etf-for-the-momentum-hungry-1499652120", "image_url": "https://si.wsj.net/public/resources/images/IF-AD144_SPOTTW_SOC_20170705144111.jpg", "sentiment": "1.02", "category": "fixed income"}, {"brand": "wsj", "title": "Yellen: Inflation Should Rebound, Fed Could Alter Policy", "url": "http://www.wsj.com/video/yellen-inflation-should-rebound-fed-could-alter-policy/A89907A7-D206-423C-ABD1-14F004B5A5B5.html", "image_url": "http://m.wsj.net/video/20170712/071217yellen1/071217yellen1_1280x720.jpg", "sentiment": "0", "category": "monetary policy"}, {"brand": "marketwatch", "title": "How the rise of drones is posing a major security nightmare", "url": "http://www.marketwatch.com/video/sectorwatch/how-the-rise-of-drones-is-posing-a-major-security-nightmare/9319C49E-5F2F-4D4A-B40A-1453AD867043.html", "image_url": "http://m.wsj.net/video/20170710/07102017_mw_dedrone/07102017_mw_dedrone_1280x720.jpg", "sentiment": "0", "category": "oil"}]}


@Injectable()
export class ArticleService {

  articleUrl = 'assets/article.json';
  title = 'Most Popular';

  constructor(private http: Http) {
    this.title = 'Most Popular';
  }

  getArticles() {
    return this.http.get(this.articleUrl)
        .map((res: Response) => res.json());
  };

  private handleError(error: any): Promise<ArticleObj[]> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);


  };

getTitle() {
  if (this.title == "") {
    return 'Most Popular';
  }
  return this.title;
}

getArts(filterValue:string){
  this.title = filterValue;
  var temp = JSON.stringify(ARTICLES);
    var articles = JSON.parse(temp);
        var filteredList = [];
  if(filterValue == 'commodities'){
      var index=0;
    for(var i =0; i < articles.articles.length; i++){
      if(articles.articles[i].category == 'oil' || articles.articles[i].category == 'copper' || articles.articles[i].category == 'gold'){
          filteredList.push(articles.articles[i]);
          index++;
          console.log(filteredList.length);
      }
    }
  }
  else if (filterValue=='') return articles.articles;
  else if(filterValue == 'alternatives'){
    var index=0;
    for(var i =0; i < articles.articles.length; i++){
      if(articles.articles[i].category == 'hedge fund' || articles.articles[i].category == 'private equity' || articles.articles[i].category == 'venture capital'){
          filteredList.push(articles.articles[i]);
          index++;
          console.log(filteredList.length);
      }
    }
  }
  else{

    // alert(articles.articles[1].title);
    var index=0;
    for(var i =0; i < articles.articles.length; i++){
      if(articles.articles[i].category == filterValue){
          filteredList.push(articles.articles[i]);
          index++;
          console.log(filteredList.length);
      }
    }
  }
    return filteredList;
}



}
