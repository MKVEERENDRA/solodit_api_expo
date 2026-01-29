function soloditApp() {
    return {
        apiKey: '',
        loading: false,
        results: null,
        rateLimit: {
            limit: 20,
            remaining: 20,
            reset: Date.now()
        },
        sleeping: false,
        sleepEndTime: null,

        // Search terms for filters
        impactSearch: '',
        firmSearch: '',
        tagSearch: '',
        categorySearch: '',
        languageSearch: '',

        openSections: {
            impact: true,
            firms: true,
            tags: true,
            protocolCategories: true,
            languages: true,
            advanced: false
        },

        toast: { show: false, message: '' },
        pagination: {
            page: 1,
            pageSize: 50
        },

        filters: {
            keywords: '',
            impact: [],
            firms: [],
            tags: [],
            protocolCategories: [],
            languages: [],
            protocol: '',
            user: '',
            minFinders: null,
            maxFinders: null,
            reported: 'alltime',
            reportedAfter: '',
            qualityScore: '',
            rarityScore: '',
            sortField: 'Recency',
            sortDirection: 'Desc'
        },

        // Complete filter data
        impactLevels: [
            { value: '', label: 'Unknown', count: 170 },
            { value: 'GAS', label: 'Gas', count: 3349 },
            { value: 'HIGH', label: 'High', count: 7871 },
            { value: 'LOW', label: 'Low', count: 24365 },
            { value: 'MEDIUM', label: 'Medium', count: 13436 }
        ],

        auditFirms: [
            { value: 'Code4rena', label: 'Code4rena', count: 12217 },
            { value: 'Zokyo', label: 'Zokyo', count: 3376 },
            { value: 'OpenZeppelin', label: 'OpenZeppelin', count: 3237 },
            { value: 'Pashov Audit Group', label: 'Pashov Audit Group', count: 3002 },
            { value: 'Cantina', label: 'Cantina', count: 2940 },
            { value: 'Sherlock', label: 'Sherlock', count: 2876 },
            { value: 'Halborn', label: 'Halborn', count: 2649 },
            { value: 'Quantstamp', label: 'Quantstamp', count: 2556 },
            { value: 'MixBytes', label: 'MixBytes', count: 2364 },
            { value: 'OtterSec', label: 'OtterSec', count: 2273 },
            { value: 'Spearbit', label: 'Spearbit', count: 2188 },
            { value: 'TrailOfBits', label: 'Trail of Bits', count: 2086 },
            { value: 'Cyfrin', label: 'Cyfrin', count: 1573 },
            { value: 'ConsenSys', label: 'ConsenSys', count: 1381 },
            { value: 'Codehawks', label: 'Codehawks', count: 1234 },
            { value: 'SigmaPrime', label: 'SigmaPrime', count: 982 },
            { value: 'Shieldify', label: 'Shieldify', count: 519 },
            { value: 'Immunefi', label: 'Immunefi', count: 376 },
            { value: 'Trust Security', label: 'Trust Security', count: 262 },
            { value: 'Hexens', label: 'Hexens', count: 228 },
            { value: 'ZachObront', label: 'ZachObront', count: 176 },
            { value: 'Guardian Audits', label: 'Guardian Audits', count: 174 },
            { value: 'AuditOne', label: 'AuditOne', count: 173 },
            { value: 'Recon Audits', label: 'Recon Audits', count: 134 },
            { value: '0x52', label: '0x52', count: 67 },
            { value: 'Oxorio', label: 'Oxorio', count: 55 },
            { value: 'Kann', label: 'Kann', count: 39 },
            { value: 'ThreeSigma', label: 'ThreeSigma', count: 35 },
            { value: 'Hans', label: 'Hans', count: 13 },
            { value: 'Naman', label: 'Naman', count: 6 }
        ],

        tags: [
            { value: 'Business Logic', label: 'Business Logic', count: 233 },
            { value: 'Validation', label: 'Validation', count: 126 },
            { value: 'Wrong Math', label: 'Wrong Math', count: 107 },
            { value: 'Front-Running', label: 'Front-Running', count: 106 },
            { value: 'DOS', label: 'DOS', count: 66 },
            { value: 'Fee On Transfer', label: 'Fee On Transfer', count: 65 },
            { value: 'Oracle', label: 'Oracle', count: 59 },
            { value: 'Reentrancy', label: 'Reentrancy', count: 59 },
            { value: 'Access Control', label: 'Access Control', count: 48 },
            { value: 'Don\'t update state', label: 'Don\'t update state', count: 47 },
            { value: 'Decimals', label: 'Decimals', count: 45 },
            { value: 'Liquidation', label: 'Liquidation', count: 42 },
            { value: 'Overflow/Underflow', label: 'Overflow/Underflow', count: 42 },
            { value: 'Admin', label: 'Admin', count: 36 },
            { value: 'Denial-Of-Service', label: 'Denial-Of-Service', count: 36 },
            { value: 'Slippage', label: 'Slippage', count: 36 },
            { value: 'Missing-Logic', label: 'Missing-Logic', count: 33 },
            { value: 'Rounding', label: 'Rounding', count: 32 },
            { value: 'Stale Price', label: 'Stale Price', count: 31 },
            { value: 'ERC4626', label: 'ERC4626', count: 27 },
            { value: 'First Depositor Issue', label: 'First Depositor Issue', count: 26 },
            { value: 'Chainlink', label: 'Chainlink', count: 25 },
            { value: 'Flash Loan', label: 'Flash Loan', count: 25 },
            { value: 'Weird ERC20', label: 'Weird ERC20', count: 25 },
            { value: 'Configuration', label: 'Configuration', count: 24 },
            { value: 'ERC20', label: 'ERC20', count: 23 },
            { value: 'Missing Check', label: 'Missing Check', count: 23 },
            { value: 'Fund Lock', label: 'Fund Lock', count: 22 },
            { value: 'Uniswap', label: 'Uniswap', count: 22 },
            { value: 'Vote', label: 'Vote', count: 22 },
            { value: 'ERC721', label: 'ERC721', count: 21 },
            { value: 'Coding-Bug', label: 'Coding-Bug', count: 20 },
            { value: 'NFT', label: 'NFT', count: 19 },
            { value: 'Sandwich Attack', label: 'Sandwich Attack', count: 19 },
            { value: 'Approve', label: 'Approve', count: 18 },
            { value: 'Chain Reorganization Attack', label: 'Chain Reorganization Attack', count: 18 },
            { value: 'Swap', label: 'Swap', count: 18 },
            { value: 'Deposit/Reward tokens', label: 'Deposit/Reward tokens', count: 17 },
            { value: 'ERC1155', label: 'ERC1155', count: 17 },
            { value: 'Gas Limit', label: 'Gas Limit', count: 17 },
            { value: 'Lending Pool', label: 'Lending Pool', count: 17 },
            { value: 'Blacklisted', label: 'Blacklisted', count: 16 },
            { value: 'Allowance', label: 'Allowance', count: 15 },
            { value: 'Bypass limit', label: 'Bypass limit', count: 15 },
            { value: 'call vs transfer', label: 'call vs transfer', count: 15 },
            { value: 'Initialization', label: 'Initialization', count: 15 },
            { value: 'Auction', label: 'Auction', count: 14 },
            { value: 'SafeTransfer', label: 'SafeTransfer', count: 14 },
            { value: 'transferFrom vs safeTransferFrom', label: 'transferFrom vs safeTransferFrom', count: 14 },
            { value: 'Type casting', label: 'Type casting', count: 14 },
            { value: 'Ownership', label: 'Ownership', count: 13 },
            { value: 'Precision Loss', label: 'Precision Loss', count: 13 },
            { value: 'Replay Attack', label: 'Replay Attack', count: 13 },
            { value: 'Grief Attack', label: 'Grief Attack', count: 12 },
            { value: 'Refund Ether', label: 'Refund Ether', count: 12 },
            { value: 'Share Inflation', label: 'Share Inflation', count: 12 },
            { value: 'ERC777', label: 'ERC777', count: 11 },
            { value: 'Code Quality', label: 'Code Quality', count: 10 },
            { value: 'Pause', label: 'Pause', count: 10 },
            { value: 'Upgradable', label: 'Upgradable', count: 10 },
            { value: 'EIP-4626', label: 'EIP-4626', count: 9 },
            { value: 'Min/Max Cap Validation', label: 'Min/Max Cap Validation', count: 9 },
            { value: 'Payable', label: 'Payable', count: 9 },
            { value: 'Timing', label: 'Timing', count: 9 },
            { value: 'TWAP', label: 'TWAP', count: 9 },
            { value: 'Vault', label: 'Vault', count: 9 },
            { value: 'Cross Chain', label: 'Cross Chain', count: 8 },
            { value: 'Delegate', label: 'Delegate', count: 8 },
            { value: 'External Call', label: 'External Call', count: 8 },
            { value: 'Initial Deposit', label: 'Initial Deposit', count: 8 },
            { value: 'Bridge', label: 'Bridge', count: 7 },
            { value: 'Broken Loop', label: 'Broken Loop', count: 7 },
            { value: 'External Contract', label: 'External Contract', count: 7 },
            { value: 'LayerZero', label: 'LayerZero', count: 7 },
            { value: 'Revert By Sending Dust', label: 'Revert By Sending Dust', count: 7 },
            { value: 'Whitelist/Blacklist Match', label: 'Whitelist/Blacklist Match', count: 7 },
            { value: '0x', label: '0x', count: 6 },
            { value: 'Account Abstraction', label: 'Account Abstraction', count: 6 },
            { value: 'Array', label: 'Array', count: 6 },
            { value: 'Data Validation', label: 'Data Validation', count: 6 },
            { value: 'Deadline', label: 'Deadline', count: 6 },
            { value: 'EIP-712', label: 'EIP-712', count: 6 },
            { value: 'ERC2981', label: 'ERC2981', count: 6 },
            { value: 'Event', label: 'Event', count: 6 },
            { value: 'from=to', label: 'from=to', count: 6 },
            { value: 'Hardcoded Address', label: 'Hardcoded Address', count: 6 },
            { value: 'L2 Sequencer', label: 'L2 Sequencer', count: 6 },
            { value: 'Pre/Post Balance', label: 'Pre/Post Balance', count: 6 },
            { value: 'Read-only Reentrancy', label: 'Read-only Reentrancy', count: 6 },
            { value: 'Royalty', label: 'Royalty', count: 6 },
            { value: 'Typo / CopyPaste', label: 'Typo / CopyPaste', count: 6 },
            { value: 'USDC', label: 'USDC', count: 6 },
            { value: 'USDT', label: 'USDT', count: 6 },
            { value: 'Withdraw Pattern', label: 'Withdraw Pattern', count: 6 }
        ],

        protocolCategories: [
            { value: 'Dexes', label: 'Dexes', count: 328 },
            { value: 'CDP', label: 'CDP', count: 305 },
            { value: 'Services', label: 'Services', count: 285 },
            { value: 'Cross Chain', label: 'Cross Chain', count: 245 },
            { value: 'Yield', label: 'Yield', count: 119 },
            { value: 'Liquid Staking', label: 'Liquid Staking', count: 102 },
            { value: 'Synthetics', label: 'Synthetics', count: 77 },
            { value: 'Staking Pool', label: 'Staking Pool', count: 61 },
            { value: 'Yield Aggregator', label: 'Yield Aggregator', count: 54 },
            { value: 'Payments', label: 'Payments', count: 53 },
            { value: 'Bridge', label: 'Bridge', count: 50 },
            { value: 'Launchpad', label: 'Launchpad', count: 50 },
            { value: 'RWA', label: 'RWA', count: 44 },
            { value: 'Leveraged Farming', label: 'Leveraged Farming', count: 40 },
            { value: 'Indexes', label: 'Indexes', count: 32 },
            { value: 'Liquidity manager', label: 'Liquidity manager', count: 27 },
            { value: 'Options Vault', label: 'Options Vault', count: 23 },
            { value: 'Oracle', label: 'Oracle', count: 18 },
            { value: 'Derivatives', label: 'Derivatives', count: 17 },
            { value: 'Lending', label: 'Lending', count: 13 },
            { value: 'Privacy', label: 'Privacy', count: 13 },
            { value: 'Insurance', label: 'Insurance', count: 12 },
            { value: 'NFT Marketplace', label: 'NFT Marketplace', count: 12 },
            { value: 'NFT Lending', label: 'NFT Lending', count: 11 },
            { value: 'Algo-Stables', label: 'Algo-Stables', count: 10 },
            { value: 'RWA Lending', label: 'RWA Lending', count: 10 },
            { value: 'Gaming', label: 'Gaming', count: 7 },
            { value: 'Prediction Market', label: 'Prediction Market', count: 4 },
            { value: 'Farm', label: 'Farm', count: 2 },
            { value: 'Decentralized Stablecoin', label: 'Decentralized Stablecoin', count: 1 },
            { value: 'Reserve Currency', label: 'Reserve Currency', count: 1 },
            { value: 'Uncollateralized Lending', label: 'Uncollateralized Lending', count: 1 }
        ],

        languages: [
            { value: 'Solidity', label: 'Solidity', count: 43442 },
            { value: 'Rust', label: 'Rust', count: 2652 },
            { value: 'Go', label: 'Go', count: 1017 },
            { value: 'Move', label: 'Move', count: 651 },
            { value: 'TypeScript', label: 'TypeScript', count: 544 },
            { value: 'Vyper', label: 'Vyper', count: 404 },
            { value: 'FunC', label: 'FunC', count: 229 },
            { value: 'JavaScript', label: 'JavaScript', count: 156 },
            { value: 'Cairo', label: 'Cairo', count: 110 },
            { value: 'Dart', label: 'Dart', count: 89 },
            { value: 'Python', label: 'Python', count: 86 },
            { value: 'Circom', label: 'Circom', count: 59 },
            { value: 'Cosmos', label: 'Cosmos', count: 48 },
            { value: 'Sway', label: 'Sway', count: 23 },
            { value: 'Yul', label: 'Yul', count: 23 },
            { value: 'Noir', label: 'Noir', count: 3 },
            { value: 'Tact', label: 'Tact', count: 3 }
        ],

        // Computed properties for filtered data
        get filteredImpacts() {
            if (!this.impactSearch) return this.impactLevels;
            return this.impactLevels.filter(impact =>
                impact.label.toLowerCase().includes(this.impactSearch.toLowerCase())
            );
        },

        get filteredFirms() {
            if (!this.firmSearch) return this.auditFirms;
            return this.auditFirms.filter(firm =>
                firm.label.toLowerCase().includes(this.firmSearch.toLowerCase())
            );
        },

        get filteredTags() {
            if (!this.tagSearch) return this.tags;
            return this.tags.filter(tag =>
                tag.label.toLowerCase().includes(this.tagSearch.toLowerCase())
            );
        },

        get filteredCategories() {
            if (!this.categorySearch) return this.protocolCategories;
            return this.protocolCategories.filter(category =>
                category.label.toLowerCase().includes(this.categorySearch.toLowerCase())
            );
        },

        get filteredLanguages() {
            if (!this.languageSearch) return this.languages;
            return this.languages.filter(lang =>
                lang.label.toLowerCase().includes(this.languageSearch.toLowerCase())
            );
        },

        init() {
            // Load API key from localStorage if available
            const savedKey = localStorage.getItem('solodit_api_key');
            if (savedKey) {
                this.apiKey = savedKey;
            }

            // Save API key to localStorage when it changes
            this.$watch('apiKey', (value) => {
                if (value) {
                    localStorage.setItem('solodit_api_key', value);
                }
            });
        },

        askForApiKey() {
            const key = prompt('Please enter your Solodit API key:');
            if (key) {
                this.apiKey = key;
                this.showToast('API key saved for this session');
                return true;
            }
            return false;
        },

        checkApiKey() {
            if (!this.apiKey) {
                return this.askForApiKey();
            }
            return true;
        },

        getSleepTimeRemaining() {
            if (!this.sleeping || !this.sleepEndTime) return 0;
            const remaining = Math.max(0, this.sleepEndTime - Date.now());
            return Math.ceil(remaining / 1000); // Convert to seconds
        },

        startSleepMode() {
            if (this.sleeping) return;

            this.sleeping = true;
            this.sleepEndTime = Date.now() + 60000; // 1 minute from now
            this.showToast('Rate limit exceeded. Sleeping for 1 minute...');

            // Check sleep status every second
            const sleepInterval = setInterval(() => {
                const now = Date.now();
                if (now >= this.sleepEndTime) {
                    this.sleeping = false;
                    this.sleepEndTime = null;

                    // Reset rate limit
                    this.rateLimit.remaining = this.rateLimit.limit;

                    this.showToast('Sleep mode ended. Rate limits reset!');
                    clearInterval(sleepInterval);
                }
            }, 1000);
        },

        toggleSection(section) {
            this.openSections[section] = !this.openSections[section];
        },

        clearAllFilters() {
            this.filters = {
                keywords: '',
                impact: [],
                firms: [],
                tags: [],
                protocolCategories: [],
                languages: [],
                protocol: '',
                user: '',
                minFinders: null,
                maxFinders: null,
                reported: 'alltime',
                reportedAfter: '',
                qualityScore: '',
                rarityScore: '',
                sortField: 'Recency',
                sortDirection: 'Desc'
            };
            this.pagination.page = 1;

            // Clear search terms
            this.impactSearch = '';
            this.firmSearch = '';
            this.tagSearch = '';
            this.categorySearch = '';
            this.languageSearch = '';

            this.showToast('All filters cleared');
        },

        buildQueryPayload() {
            const payload = {
                page: this.pagination.page,
                pageSize: this.pagination.pageSize,
                filters: {}
            };

            // Add filters only if they have values
            if (this.filters.keywords) {
                payload.filters.keywords = this.filters.keywords;
            }

            if (this.filters.impact.length > 0) {
                payload.filters.impact = this.filters.impact;
            }

            if (this.filters.firms.length > 0) {
                payload.filters.firms = this.filters.firms.map(firm => ({ value: firm, label: firm }));
            }

            if (this.filters.tags.length > 0) {
                payload.filters.tags = this.filters.tags.map(tag => ({ value: tag, label: tag }));
            }

            if (this.filters.protocolCategories.length > 0) {
                payload.filters.protocolCategory = this.filters.protocolCategories.map(cat => ({ value: cat, label: cat }));
            }

            if (this.filters.languages.length > 0) {
                payload.filters.languages = this.filters.languages.map(lang => ({ value: lang, label: lang }));
            }

            if (this.filters.protocol) {
                payload.filters.protocol = this.filters.protocol;
            }

            if (this.filters.user) {
                payload.filters.user = this.filters.user;
            }

            if (this.filters.minFinders !== null) {
                payload.filters.minFinders = this.filters.minFinders.toString();
            }

            if (this.filters.maxFinders !== null) {
                payload.filters.maxFinders = this.filters.maxFinders.toString();
            }

            if (this.filters.reported !== 'alltime') {
                payload.filters.reported = { value: this.filters.reported };
                if (this.filters.reported === 'after' && this.filters.reportedAfter) {
                    payload.filters.reportedAfter = this.filters.reportedAfter;
                }
            }

            if (this.filters.qualityScore) {
                payload.filters.qualityScore = parseInt(this.filters.qualityScore);
            }

            if (this.filters.rarityScore) {
                payload.filters.rarityScore = parseInt(this.filters.rarityScore);
            }

            payload.filters.sortField = this.filters.sortField;
            payload.filters.sortDirection = this.filters.sortDirection;

            return payload;
        },

        async searchFindings() {
            // Check if we're sleeping
            if (this.sleeping) {
                const remaining = this.getSleepTimeRemaining();
                this.showToast(`Sleeping... ${remaining} seconds remaining`);
                return;
            }

            // Check for API key
            if (!this.checkApiKey()) {
                return;
            }

            this.loading = true;

            try {
                const payload = this.buildQueryPayload();

                // Enhanced client-side logging
                console.log('🔑 === SOLODIT API REQUEST START ===');
                console.log('📋 Request Details:');
                console.log('   - Timestamp:', new Date().toISOString());
                console.log('   - API Key:', `${'*'.repeat(20)}${this.apiKey.slice(-4)}`);
                console.log('   - Endpoint:', '/api/solodit');

                console.log('📤 Request Payload (Solodit API Format):');
                console.log('   {');
                console.log(`     "page": ${payload.page},`);
                console.log(`     "pageSize": ${payload.pageSize},`);

                if (payload.filters && Object.keys(payload.filters).length > 0) {
                    console.log('     "filters": {');

                    // Keywords
                    if (payload.filters.keywords) {
                        console.log(`       "keywords": "${payload.filters.keywords}",`);
                    }

                    // Impact Levels
                    if (payload.filters.impact && payload.filters.impact.length > 0) {
                        const impactStr = payload.filters.impact.map(imp => `"${imp}"`).join(', ');
                        console.log(`       "impact": [${impactStr}],`);
                    }

                    // Audit Firms
                    if (payload.filters.firms && payload.filters.firms.length > 0) {
                        const firmItems = payload.filters.firms.map(firm =>
                            typeof firm === 'object' ? `{ "value": "${firm.value}" }` : `{ "value": "${firm}" }`
                        ).join(', ');
                        console.log(`       "firms": [${firmItems}],`);
                    }

                    // Tags
                    if (payload.filters.tags && payload.filters.tags.length > 0) {
                        const tagItems = payload.filters.tags.map(tag =>
                            typeof tag === 'object' ? `{ "value": "${tag.value}" }` : `{ "value": "${tag}" }`
                        ).join(', ');
                        console.log(`       "tags": [${tagItems}],`);
                    }

                    // Protocol Categories
                    if (payload.filters.protocolCategory && payload.filters.protocolCategory.length > 0) {
                        const categoryItems = payload.filters.protocolCategory.map(cat =>
                            typeof cat === 'object' ? `{ "value": "${cat.value}" }` : `{ "value": "${cat}" }`
                        ).join(', ');
                        console.log(`       "protocolCategory": [${categoryItems}],`);
                    }

                    // Programming Languages
                    if (payload.filters.languages && payload.filters.languages.length > 0) {
                        const languageItems = payload.filters.languages.map(lang =>
                            typeof lang === 'object' ? `{ "value": "${lang.value}" }` : `{ "value": "${lang}" }`
                        ).join(', ');
                        console.log(`       "languages": [${languageItems}],`);
                    }

                    // Protocol Name
                    if (payload.filters.protocol) {
                        console.log(`       "protocol": "${payload.filters.protocol}",`);
                    }

                    // Finder/User
                    if (payload.filters.user) {
                        console.log(`       "user": "${payload.filters.user}",`);
                    }

                    // Quality Score
                    if (payload.filters.qualityScore) {
                        console.log(`       "qualityScore": ${payload.filters.qualityScore},`);
                    }

                    // Rarity Score
                    if (payload.filters.rarityScore) {
                        console.log(`       "rarityScore": ${payload.filters.rarityScore},`);
                    }

                    // Date Range
                    if (payload.filters.reported) {
                        if (typeof payload.filters.reported === 'object') {
                            console.log(`       "reported": { "value": "${payload.filters.reported.value}" },`);
                            if (payload.filters.reported.value === 'after' && payload.filters.reportedAfter) {
                                console.log(`       "reportedAfter": "${payload.filters.reportedAfter}",`);
                            }
                        } else {
                            console.log(`       "reported": { "value": "${payload.filters.reported}" },`);
                        }
                    }

                    // Finder Count Range
                    if (payload.filters.minFinders !== null || payload.filters.maxFinders !== null) {
                        const minF = payload.filters.minFinders !== null ? payload.filters.minFinders : 'Not specified';
                        const maxF = payload.filters.maxFinders !== null ? payload.filters.maxFinders : 'Not specified';
                        console.log(`       "minFinders": "${minF}",`);
                        console.log(`       "maxFinders": "${maxF}",`);
                    }

                    // Sorting
                    if (payload.filters.sortField) {
                        console.log(`       "sortField": "${payload.filters.sortField}",`);
                    }
                    if (payload.filters.sortDirection) {
                        console.log(`       "sortDirection": "${payload.filters.sortDirection}",`);
                    }

                    console.log('     }');
                } else {
                    console.log('     "filters": {}');
                }

                console.log('   }');
                console.log('');
                console.log('📋 API Specification Compliance:');
                console.log('   - Base URL: https://solodit.cyfrin.io/api/v1/solodit');
                console.log('   - Endpoint: /findings');
                console.log('   - Method: POST');
                console.log('   - Auth: X-Cyfrin-API-Key header');
                console.log('   - Rate Limit: 20 requests/60 seconds');
                console.log('   - Pagination: Up to 100 results per page');
                console.log('');

                console.log('🌐 Sending request to server...');

                // Use local proxy to avoid CORS issues
                const response = await fetch('/api/solodit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Cyfrin-API-Key': this.apiKey
                    },
                    body: JSON.stringify(payload)
                });

                console.log('✅ Server Response Received:');
                console.log('   - Status:', response.status, response.statusText);
                console.log('   - Headers:', Object.fromEntries(response.headers.entries()));

                if (!response.ok) {
                    const error = await response.json();
                    console.log('❌ API Error Response:', error);

                    // If rate limited, start sleep mode
                    if (response.status === 429) {
                        console.log('⚠️ Rate limit detected, entering sleep mode');
                        this.rateLimit.remaining = 0;
                        this.startSleepMode();
                        return;
                    }

                    throw new Error(error.message || `HTTP ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                console.log('📊 API Response Data:');
                console.log('   - Total Results:', data.metadata?.totalResults);
                console.log('   - Current Page:', data.metadata?.currentPage);
                console.log('   - Total Pages:', data.metadata?.totalPages);
                console.log('   - Findings Count:', data.findings?.length);

                if (data.findings && data.findings.length > 0) {
                    console.log('   - Sample Finding:', {
                        title: data.findings[0].title?.substring(0, 50) + '...',
                        impact: data.findings[0].impact,
                        firm: data.findings[0].firm_name
                    });
                }

                this.results = data;

                // Update rate limit from headers if available
                const rateLimitHeaders = {
                    limit: response.headers.get('X-RateLimit-Limit'),
                    remaining: response.headers.get('X-RateLimit-Remaining'),
                    reset: response.headers.get('X-RateLimit-Reset')
                };

                if (rateLimitHeaders.limit) {
                    this.rateLimit.limit = parseInt(rateLimitHeaders.limit);
                }
                if (rateLimitHeaders.remaining) {
                    this.rateLimit.remaining = parseInt(rateLimitHeaders.remaining);
                }
                if (rateLimitHeaders.reset) {
                    this.rateLimit.reset = parseInt(rateLimitHeaders.reset);
                }

                console.log('📈 Rate Limit Updated:', {
                    limit: this.rateLimit.limit,
                    remaining: this.rateLimit.remaining,
                    reset: new Date(this.rateLimit.reset * 1000).toISOString()
                });

                console.log('🎉 === API REQUEST COMPLETED SUCCESSFULLY ===\n');

                // Show current API key info
                this.showToast(`Found ${data.metadata.totalResults} findings (${this.rateLimit.remaining} requests remaining)`);

            } catch (error) {
                console.error('❌ === API REQUEST FAILED ===');
                console.error('📋 Error Details:');
                console.error('   - Error Type:', error.constructor.name);
                console.error('   - Error Message:', error.message);
                console.error('   - Timestamp:', new Date().toISOString());
                console.error('💡 Possible Solutions:');

                if (error.message.includes('Failed to fetch')) {
                    console.error('   - Check server is running on localhost:8000');
                    console.error('   - Check network connection');
                } else if (error.message.includes('API key')) {
                    console.error('   - Verify API key is valid and not expired');
                } else if (error.message.includes('Rate limit')) {
                    console.error('   - Wait for rate limit to reset');
                }

                console.error('=== END ERROR REPORT ===\n');

                this.showToast(`Error: ${error.message}`);
                this.results = null;
            } finally {
                this.loading = false;
            }
        },

        async exportToMarkdown() {
            if (!this.results || this.results.findings.length === 0) {
                this.showToast('No results to export');
                return;
            }

            // Ask user how many findings they want to export
            const totalCount = this.results.metadata.totalResults;
            const count = prompt(`How many findings do you want to export? (Available: ${totalCount} total)`, totalCount.toString());
            if (!count) return;

            const exportCount = Math.min(parseInt(count), totalCount);

            this.showToast(`🔄 Exporting ${exportCount} findings...`);

            let allFindings = [];
            let currentPage = 1;
            const pageSize = 100; // Use max page size for efficient fetching

            // Store current pagination state
            const originalPage = this.pagination.page;
            const originalPageSize = this.pagination.pageSize;

            try {
                // Calculate how many pages we need to fetch
                const pagesNeeded = Math.ceil(exportCount / pageSize);

                for (let page = 1; page <= pagesNeeded; page++) {
                    // Update pagination for this fetch
                    this.pagination.page = page;
                    this.pagination.pageSize = pageSize;

                    // Build query payload
                    const payload = this.buildQueryPayload();
                    payload.page = page;
                    payload.pageSize = pageSize;

                    // Fetch this page of results
                    const response = await fetch('/api/solodit', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Cyfrin-API-Key': this.apiKey
                        },
                        body: JSON.stringify(payload)
                    });

                    if (!response.ok) {
                        throw new Error(`Failed to fetch page ${page}: ${response.statusText}`);
                    }

                    const data = await response.json();

                    // Add findings to our collection
                    const findingsToAdd = data.findings.slice(0, Math.min(pageSize, exportCount - allFindings.length));
                    allFindings.push(...findingsToAdd);

                    // Update progress
                    this.showToast(`🔄 Fetched ${allFindings.length}/${exportCount} findings...`);

                    // Break if we have enough findings
                    if (allFindings.length >= exportCount) break;
                }

                // Restore original pagination
                this.pagination.page = originalPage;
                this.pagination.pageSize = originalPageSize;

                // Generate filename with category and severity
                const categories = this.filters.protocolCategories.length > 0 ? this.filters.protocolCategories.join('-') : 'All';
                const severities = this.filters.impact.length > 0 ? this.filters.impact.join('-') : 'All';
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
                const filename = `${categories}-${severities}-findings-${timestamp}.md`;

                let markdown = `# Solodit Findings Export\n\n`;
                markdown += `**Generated:** ${new Date().toLocaleString()}\n`;
                markdown += `**Total Results Available:** ${this.results.metadata.totalResults}\n`;
                markdown += `**Exported Findings:** ${allFindings.length} out of ${this.results.metadata.totalResults} total\n`;
                markdown += `**Pages Fetched:** ${pagesNeeded} pages\n\n`;

                // Add applied filters at the top
                const appliedFilters = this.getAppliedFilters();
                if (appliedFilters.length > 0) {
                    markdown += `## 🎯 Applied Filters\n\n`;
                    appliedFilters.forEach(filter => {
                        markdown += `- **${filter.label}:** ${filter.value}\n`;
                    });
                    markdown += `\n`;
                }

                // Add findings
                markdown += `## 🔍 Findings (${allFindings.length} items)\n\n`;

                allFindings.forEach((finding, index) => {
                    markdown += `### ${index + 1}. ${finding.title}\n\n`;

                    // Impact badge
                    const impactEmoji = {
                        'HIGH': '🔴',
                        'MEDIUM': '🟡',
                        'LOW': '🔵',
                        'GAS': '⚡'
                    };
                    markdown += `**Impact:** ${impactEmoji[finding.impact] || ''} ${finding.impact}\n\n`;

                    // Metadata
                    if (finding.firm_name) markdown += `**Audit Firm:** ${finding.firm_name}\n`;
                    if (finding.protocol_name) markdown += `**Protocol:** ${finding.protocol_name}\n`;
                    markdown += `**Quality Score:** ${finding.quality_score}/5\n`;
                    markdown += `**Rarity Score:** ${finding.general_score}/5\n`;
                    if (finding.report_date) {
                        markdown += `**Report Date:** ${new Date(finding.report_date).toLocaleDateString()}\n`;
                    }
                    if (finding.finders_count > 0) {
                        const finders = finding.issues_issue_finders.map(f => f.wardens_warden.handle).join(', ');
                        markdown += `**Finders:** ${finders}\n`;
                    }

                    markdown += `\n`;

                    // Summary/Content
                    if (finding.summary) {
                        markdown += `**Summary:**\n${finding.summary}\n\n`;
                    } else if (finding.content) {
                        const preview = finding.content.substring(0, 500);
                        markdown += `**Preview:**\n${preview}${finding.content.length > 500 ? '...' : ''}\n\n`;
                    }

                    // Tags
                    if (finding.issues_issuetagscore && finding.issues_issuetagscore.length > 0) {
                        const tags = finding.issues_issuetagscore.map(t => t.tags_tag.title).join(', ');
                        markdown += `**Tags:** ${tags}\n\n`;
                    }

                    // Links
                    const links = [];
                    if (finding.source_link) links.push(`[Source](${finding.source_link})`);
                    if (finding.github_link) links.push(`[GitHub](${finding.github_link})`);
                    if (finding.pdf_link) links.push(`[PDF](${finding.pdf_link})`);

                    if (links.length > 0) {
                        markdown += `**Links:** ${links.join(' | ')}\n\n`;
                    }

                    markdown += `---\n\n`;
                });

                // Save file via server
                const saveResponse = await fetch('/api/save-file', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        filename: filename,
                        content: markdown,
                        folder: 'exports'
                    })
                });

                if (saveResponse.ok) {
                    const saveData = await saveResponse.json();
                    this.showToast(`✅ Exported ${allFindings.length} findings to ${saveData.filepath}`);
                } else {
                    throw new Error('Failed to save file');
                }

            } catch (error) {
                console.error('Export error:', error);
                this.showToast(`❌ Export error: ${error.message}`);

                // Restore original pagination on error
                this.pagination.page = originalPage;
                this.pagination.pageSize = originalPageSize;
            }
        },

        getAppliedFilters() {
            const applied = [];

            if (this.filters.keywords) {
                applied.push({ label: 'Keywords', value: this.filters.keywords });
            }

            if (this.filters.impact.length > 0) {
                applied.push({ label: 'Impact', value: this.filters.impact.join(', ') });
            }

            if (this.filters.firms.length > 0) {
                applied.push({ label: 'Audit Firms', value: this.filters.firms.join(', ') });
            }

            if (this.filters.tags.length > 0) {
                applied.push({ label: 'Tags', value: this.filters.tags.join(', ') });
            }

            if (this.filters.protocolCategories.length > 0) {
                applied.push({ label: 'Protocol Categories', value: this.filters.protocolCategories.join(', ') });
            }

            if (this.filters.languages.length > 0) {
                applied.push({ label: 'Languages', value: this.filters.languages.join(', ') });
            }

            if (this.filters.protocol) {
                applied.push({ label: 'Protocol', value: this.filters.protocol });
            }

            if (this.filters.user) {
                applied.push({ label: 'Finder', value: this.filters.user });
            }

            if (this.filters.minFinders !== null || this.filters.maxFinders !== null) {
                const range = `${this.filters.minFinders || '0'} - ${this.filters.maxFinders || '∞'}`;
                applied.push({ label: 'Finders Count', value: range });
            }

            if (this.filters.reported !== 'alltime') {
                let dateFilter = this.filters.reported;
                if (this.filters.reported === 'after' && this.filters.reportedAfter) {
                    dateFilter += ` ${this.filters.reportedAfter}`;
                }
                applied.push({ label: 'Date Range', value: dateFilter });
            }

            if (this.filters.qualityScore) {
                applied.push({ label: 'Min Quality Score', value: this.filters.qualityScore });
            }

            if (this.filters.rarityScore) {
                applied.push({ label: 'Min Rarity Score', value: this.filters.rarityScore });
            }

            applied.push({ label: 'Sort', value: `${this.filters.sortField} ${this.filters.sortDirection}` });

            return applied;
        },

        copyCurlCommand() {
            if (!this.checkApiKey()) {
                return;
            }

            const payload = this.buildQueryPayload();

            let curlCommand = `curl -X POST https://solodit.cyfrin.io/api/v1/solodit/findings \\\n`;
            curlCommand += `  -H "Content-Type: application/json" \\\n`;
            curlCommand += `  -H "X-Cyfrin-API-Key: ${this.apiKey}" \\\n`;
            curlCommand += `  -d '${JSON.stringify(payload, null, 2)}'`;

            navigator.clipboard.writeText(curlCommand).then(() => {
                this.showToast('cURL command copied to clipboard');
            }).catch(() => {
                this.showToast('Failed to copy cURL command');
            });
        },

        showToast(message) {
            this.toast.message = message;
            this.toast.show = true;

            setTimeout(() => {
                this.toast.show = false;
            }, 3000);
        },

        previousPage() {
            if (this.pagination.page > 1) {
                this.pagination.page--;
                this.searchFindings();
            }
        },

        nextPage() {
            if (this.results && this.pagination.page < this.results.metadata.totalPages) {
                this.pagination.page++;
                this.searchFindings();
            }
        }
    };
}

// Initialize the app
document.addEventListener('alpine:init', () => {
    Alpine.data('soloditApp', soloditApp);
});
