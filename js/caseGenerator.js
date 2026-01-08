/* ===================================
   CASE011 - Case Generator
   Procedural case generation system
   =================================== */

// Case seed database
const CASE_SEEDS = [
    {
        id: 'voynich-manuscript',
        title: 'The Voynich Manuscript',
        category: 'cryptographic',
        difficulty: 'hard',
        briefing: `
            <p>In 1912, a rare book dealer named Wilfrid Voynich discovered a mysterious manuscript in an Italian monastery. The book, carbon-dated to the early 15th century, contains approximately 240 pages of text written in an unknown script, accompanied by bizarre illustrations of unidentified plants, astronomical diagrams, and human figures.</p>
            <p>Despite decades of analysis by the world's best cryptographers, linguists, and historians, no one has successfully deciphered the manuscript's contents. The text follows statistical patterns similar to natural languages, yet matches no known linguistic system.</p>
            <p>Your mission: Investigate the available evidence, analyze the patterns, and develop a theory about the manuscript's origin and purpose.</p>
        `,
        wikipedia: 'https://en.wikipedia.org/wiki/Voynich_manuscript',
        artifacts: [
            {
                type: 'article',
                title: 'Yale University - Voynich Manuscript Digital Collection',
                description: 'High-resolution scans of the complete manuscript',
                url: 'https://en.wikipedia.org/wiki/Voynich_manuscript'
            },
            {
                type: 'video',
                title: 'Documentary: The Most Mysterious Manuscript',
                description: 'Comprehensive analysis of decryption attempts',
                url: 'https://www.youtube.com/results?search_query=voynich+manuscript+documentary'
            },
            {
                type: 'article',
                title: 'Scientific American - Decoding Attempts',
                description: 'Recent computational analysis and theories',
                url: 'https://www.scientificamerican.com/article/voynich-manuscript/'
            },
            {
                type: 'research',
                title: 'Linguistic Analysis Papers',
                description: 'Academic research on the manuscript\'s language patterns',
                url: 'https://scholar.google.com/scholar?q=voynich+manuscript'
            }
        ]
    },
    {
        id: 'dyatlov-pass',
        title: 'The Dyatlov Pass Incident',
        category: 'disappearance',
        difficulty: 'medium',
        briefing: `
            <p>In February 1959, nine experienced Soviet hikers died under mysterious circumstances in the Ural Mountains. The group, led by Igor Dyatlov, was found scattered across the mountainside, some partially clothed despite sub-zero temperatures, with unexplained injuries.</p>
            <p>The tent was cut open from the inside. Some victims had severe internal trauma with no external wounds. Traces of radiation were detected on some clothing. The official investigation concluded "unknown compelling force" caused the deaths.</p>
            <p>Your mission: Examine the evidence, autopsy reports, and environmental factors to develop a coherent explanation for what happened that night.</p>
        `,
        wikipedia: 'https://en.wikipedia.org/wiki/Dyatlov_Pass_incident',
        artifacts: [
            {
                type: 'article',
                title: 'Dyatlov Foundation - Official Investigation Files',
                description: 'Translated Soviet investigation documents',
                url: 'https://en.wikipedia.org/wiki/Dyatlov_Pass_incident'
            },
            {
                type: 'article',
                title: 'National Geographic Investigation',
                description: 'Modern forensic analysis of the incident',
                url: 'https://www.nationalgeographic.com/science/article/dyatlov-pass-incident'
            },
            {
                type: 'video',
                title: 'Expedition Documentary',
                description: 'Return to Dyatlov Pass with experts',
                url: 'https://www.youtube.com/results?search_query=dyatlov+pass+documentary'
            }
        ]
    },
    {
        id: 'tamam-shud',
        title: 'The Tamam Shud Case',
        category: 'disappearance',
        difficulty: 'hard',
        briefing: `
            <p>On December 1, 1948, an unidentified man was found dead on Somerton Beach in Adelaide, Australia. He carried no identification, and all labels had been removed from his clothing. In his pocket was a scrap of paper with the words "Tamam Shud" (meaning "ended" or "finished") torn from a rare edition of the Rubaiyat of Omar Khayyam.</p>
            <p>The book was later found with an indecipherable code written on its back page. Despite extensive investigation, the man's identity, cause of death, and the meaning of the code remain unknown.</p>
            <p>Your mission: Analyze the cryptographic evidence, investigate the historical context, and propose theories about the unknown man's identity and fate.</p>
        `,
        wikipedia: 'https://en.wikipedia.org/wiki/Tamam_Shud_case',
        artifacts: [
            {
                type: 'article',
                title: 'South Australian Police Files',
                description: 'Official investigation documents and autopsy',
                url: 'https://en.wikipedia.org/wiki/Tamam_Shud_case'
            },
            {
                type: 'article',
                title: 'The Code Analysis',
                description: 'Cryptographic attempts to decode the message',
                url: 'https://www.abc.net.au/news/somerton-man'
            },
            {
                type: 'video',
                title: 'Mystery Investigation Documentary',
                description: 'Comprehensive analysis of all evidence',
                url: 'https://www.youtube.com/results?search_query=tamam+shud+case'
            }
        ]
    },
    {
        id: 'db-cooper',
        title: 'The D.B. Cooper Hijacking',
        category: 'disappearance',
        difficulty: 'medium',
        briefing: `
            <p>On November 24, 1971, a man using the alias "Dan Cooper" hijacked a Boeing 727, extorted $200,000 in ransom, and parachuted into the night over the Pacific Northwest. He was never seen again.</p>
            <p>Despite one of the most extensive manhunts in FBI history, Cooper's identity and fate remain unknown. In 1980, a small portion of the ransom money was found along the Columbia River, but no other trace of Cooper or the money has ever been discovered.</p>
            <p>Your mission: Investigate the evidence, analyze the flight path and weather conditions, and develop theories about Cooper's identity and whether he survived the jump.</p>
        `,
        wikipedia: 'https://en.wikipedia.org/wiki/D._B._Cooper',
        artifacts: [
            {
                type: 'article',
                title: 'FBI Case Files - D.B. Cooper',
                description: 'Official investigation documents',
                url: 'https://en.wikipedia.org/wiki/D._B._Cooper'
            },
            {
                type: 'article',
                title: 'The Money Discovery',
                description: 'Analysis of the found ransom bills',
                url: 'https://www.fbi.gov/history/famous-cases/db-cooper-hijacking'
            },
            {
                type: 'video',
                title: 'Hijacking Reconstruction',
                description: 'Expert analysis of the parachute jump',
                url: 'https://www.youtube.com/results?search_query=db+cooper+documentary'
            }
        ]
    },
    {
        id: 'zodiac-cipher',
        title: 'The Zodiac Killer Ciphers',
        category: 'cryptographic',
        difficulty: 'hard',
        briefing: `
            <p>Between 1968 and 1969, a serial killer known as the Zodiac terrorized Northern California, claiming at least five victims. The killer sent taunting letters to newspapers, including four cryptograms. While two have been solved, two remain undeciphered after more than 50 years.</p>
            <p>The Z340 cipher was finally cracked in 2020, but the Z13 and Z32 ciphers continue to puzzle cryptographers. The killer's identity remains unknown.</p>
            <p>Your mission: Study the solved ciphers, analyze the unsolved codes, and investigate the patterns that might reveal the killer's identity or methods.</p>
        `,
        wikipedia: 'https://en.wikipedia.org/wiki/Zodiac_Killer',
        artifacts: [
            {
                type: 'article',
                title: 'Zodiac Cipher Database',
                description: 'Complete collection of all Zodiac communications',
                url: 'https://en.wikipedia.org/wiki/Zodiac_Killer'
            },
            {
                type: 'article',
                title: 'The Z340 Solution (2020)',
                description: 'How the 51-year-old cipher was finally cracked',
                url: 'https://www.fbi.gov/news/stories/zodiac-killer-cipher'
            },
            {
                type: 'research',
                title: 'Cryptographic Analysis Papers',
                description: 'Academic research on the unsolved ciphers',
                url: 'https://scholar.google.com/scholar?q=zodiac+killer+cipher'
            }
        ]
    },
    {
        id: 'antikythera',
        title: 'The Antikythera Mechanism',
        category: 'archaeological',
        difficulty: 'medium',
        briefing: `
            <p>In 1901, divers discovered a corroded bronze device in an ancient shipwreck off the Greek island of Antikythera. Dating to around 100 BCE, the mechanism is an extraordinarily sophisticated astronomical calculator, far more advanced than any known technology from that era.</p>
            <p>The device could predict eclipses, track the Olympic Games cycle, and model the irregular orbit of the Moon. Its existence suggests a level of ancient Greek technological sophistication that was lost for over a millennium.</p>
            <p>Your mission: Investigate how such advanced technology could exist in ancient times and what happened to this knowledge.</p>
        `,
        wikipedia: 'https://en.wikipedia.org/wiki/Antikythera_mechanism',
        artifacts: [
            {
                type: 'article',
                title: 'Antikythera Mechanism Research Project',
                description: 'Detailed technical analysis and reconstructions',
                url: 'https://en.wikipedia.org/wiki/Antikythera_mechanism'
            },
            {
                type: 'video',
                title: 'How It Works - 3D Reconstruction',
                description: 'Animated explanation of the mechanism\'s functions',
                url: 'https://www.youtube.com/results?search_query=antikythera+mechanism'
            },
            {
                type: 'research',
                title: 'Scientific Papers on Ancient Technology',
                description: 'Academic research on ancient Greek engineering',
                url: 'https://www.nature.com/articles/antikythera'
            }
        ]
    },
    {
        id: 'oak-island',
        title: 'The Oak Island Money Pit',
        category: 'archaeological',
        difficulty: 'medium',
        briefing: `
            <p>In 1795, teenager Daniel McGinnis discovered a circular depression on Oak Island, Nova Scotia. Excavation revealed a shaft with wooden platforms every 10 feet. At 90 feet, a stone tablet with mysterious inscriptions was found, reportedly translating to "Forty feet below, two million pounds lie buried."</p>
            <p>Despite over 200 years of excavation attempts, no treasure has been recovered. The pit features sophisticated flood tunnels that fill the shaft with seawater when disturbed. Six people have died searching for the treasure.</p>
            <p>Your mission: Analyze the engineering evidence, historical records, and theories about what might be buried and who created this elaborate structure.</p>
        `,
        wikipedia: 'https://en.wikipedia.org/wiki/Oak_Island_mystery',
        artifacts: [
            {
                type: 'article',
                title: 'Oak Island Historical Society',
                description: 'Complete timeline of excavation attempts',
                url: 'https://en.wikipedia.org/wiki/Oak_Island_mystery'
            },
            {
                type: 'article',
                title: 'Engineering Analysis of the Flood Tunnels',
                description: 'Technical examination of the pit\'s construction',
                url: 'https://www.oakislandmystery.com'
            },
            {
                type: 'video',
                title: 'Excavation Documentary Series',
                description: 'Modern investigation using advanced technology',
                url: 'https://www.youtube.com/results?search_query=oak+island+mystery'
            }
        ]
    },
    {
        id: 'beale-ciphers',
        title: 'The Beale Ciphers',
        category: 'cryptographic',
        difficulty: 'hard',
        briefing: `
            <p>In 1885, a pamphlet was published describing three encrypted messages allegedly left by Thomas J. Beale in 1822. The ciphers supposedly reveal the location of a treasure worth millions buried in Bedford County, Virginia.</p>
            <p>Only one cipher (describing the treasure's contents) has been decoded using the Declaration of Independence as a key. The other two, revealing the location and the rightful heirs, remain unsolved. Many suspect the entire story is an elaborate hoax.</p>
            <p>Your mission: Analyze the ciphers, investigate the historical evidence for Beale's existence, and determine if the treasure is real or a 19th-century puzzle.</p>
        `,
        wikipedia: 'https://en.wikipedia.org/wiki/Beale_ciphers',
        artifacts: [
            {
                type: 'article',
                title: 'The Beale Papers - Original Pamphlet',
                description: 'Complete text of the 1885 publication',
                url: 'https://en.wikipedia.org/wiki/Beale_ciphers'
            },
            {
                type: 'article',
                title: 'Cryptographic Analysis',
                description: 'Modern attempts to solve the remaining ciphers',
                url: 'https://www.bealecipher.com'
            },
            {
                type: 'research',
                title: 'Historical Investigation of Thomas Beale',
                description: 'Research into whether Beale actually existed',
                url: 'https://scholar.google.com/scholar?q=beale+cipher'
            }
        ]
    },
    {
        id: 'roanoke-colony',
        title: 'The Lost Colony of Roanoke',
        category: 'historical',
        difficulty: 'medium',
        briefing: `
            <p>In 1587, 115 English settlers established a colony on Roanoke Island. When supply ships returned in 1590, the colony was deserted. The only clue was the word "CROATOAN" carved into a post and "CRO" carved into a tree.</p>
            <p>No trace of the colonists was ever found. Theories range from integration with local tribes to Spanish attack, disease, or starvation. Recent archaeological evidence suggests some colonists may have survived and dispersed.</p>
            <p>Your mission: Examine historical records, archaeological findings, and Native American oral histories to determine what happened to the Lost Colony.</p>
        `,
        wikipedia: 'https://en.wikipedia.org/wiki/Roanoke_Colony',
        artifacts: [
            {
                type: 'article',
                title: 'National Park Service - Roanoke Colony',
                description: 'Historical documentation and timeline',
                url: 'https://en.wikipedia.org/wiki/Roanoke_Colony'
            },
            {
                type: 'article',
                title: 'Recent Archaeological Discoveries',
                description: 'New evidence from excavation sites',
                url: 'https://www.smithsonianmag.com/roanoke-colony'
            },
            {
                type: 'video',
                title: 'Historical Investigation Documentary',
                description: 'Expert analysis of all theories',
                url: 'https://www.youtube.com/results?search_query=lost+colony+roanoke'
            }
        ]
    },
    {
        id: 'tunguska-event',
        title: 'The Tunguska Event',
        category: 'scientific',
        difficulty: 'medium',
        briefing: `
            <p>On June 30, 1908, a massive explosion occurred near the Tunguska River in Siberia, flattening 80 million trees over 2,150 square kilometers. The blast was 1,000 times more powerful than the Hiroshima atomic bomb, yet no impact crater was ever found.</p>
            <p>Witnesses reported a bright light and intense heat. Seismic stations across Europe recorded the shock. The most accepted theory is an airburst from a meteor or comet, but the lack of debris remains puzzling.</p>
            <p>Your mission: Analyze eyewitness accounts, scientific data, and expedition reports to determine what caused the Tunguska explosion.</p>
        `,
        wikipedia: 'https://en.wikipedia.org/wiki/Tunguska_event',
        artifacts: [
            {
                type: 'article',
                title: 'Scientific Analysis of the Tunguska Event',
                description: 'Comprehensive research on the explosion',
                url: 'https://en.wikipedia.org/wiki/Tunguska_event'
            },
            {
                type: 'article',
                title: 'Expedition Reports and Findings',
                description: 'Documentation from scientific expeditions',
                url: 'https://www.nasa.gov/tunguska'
            },
            {
                type: 'video',
                title: 'Scientific Documentary',
                description: 'Expert theories and simulations',
                url: 'https://www.youtube.com/results?search_query=tunguska+event+documentary'
            }
        ]
    },
    {
        id: 'bermuda-triangle',
        title: 'The Bermuda Triangle Disappearances',
        category: 'disappearance',
        difficulty: 'medium',
        briefing: `
            <p>The Bermuda Triangle, a region in the western North Atlantic Ocean, has been associated with numerous unexplained disappearances of ships and aircraft since the mid-20th century. The most famous case is Flight 19, where five U.S. Navy torpedo bombers vanished in 1945, followed by the rescue plane sent to find them.</p>
            <p>Over the decades, dozens of vessels and aircraft have disappeared without a trace in this area. While many attribute these incidents to natural phenomena like methane hydrates, rogue waves, or magnetic anomalies, no single explanation accounts for all cases.</p>
            <p>Your mission: Investigate the documented disappearances, analyze environmental factors, and determine whether the Bermuda Triangle represents a genuine anomaly or statistical coincidence.</p>
        `,
        wikipedia: 'https://en.wikipedia.org/wiki/Bermuda_Triangle',
        artifacts: [
            {
                type: 'article',
                title: 'NOAA - Bermuda Triangle Facts',
                description: 'Official scientific analysis of the region',
                url: 'https://en.wikipedia.org/wiki/Bermuda_Triangle'
            },
            {
                type: 'article',
                title: 'Flight 19 Investigation Report',
                description: 'Detailed account of the famous 1945 disappearance',
                url: 'https://www.history.com/topics/bermuda-triangle'
            },
            {
                type: 'video',
                title: 'Scientific Investigation Documentary',
                description: 'Modern analysis of disappearances and theories',
                url: 'https://www.youtube.com/results?search_query=bermuda+triangle+documentary'
            }
        ]
    },
    {
        id: 'mh370',
        title: 'Malaysian Airlines Flight MH370',
        category: 'disappearance',
        difficulty: 'hard',
        briefing: `
            <p>On March 8, 2014, Malaysia Airlines Flight 370 disappeared while flying from Kuala Lumpur to Beijing with 239 people aboard. The Boeing 777 vanished from radar screens, and despite the largest search operation in aviation history, the main wreckage has never been found.</p>
            <p>Satellite data suggests the plane deviated from its planned route and flew for hours after losing contact. Some debris confirmed to be from MH370 has washed up on shores across the Indian Ocean, but the aircraft's final location and the cause of the disappearance remain unknown.</p>
            <p>Your mission: Analyze the available evidence, satellite data, and debris findings to develop theories about what happened to MH370 and where it might be located.</p>
        `,
        wikipedia: 'https://en.wikipedia.org/wiki/Malaysia_Airlines_Flight_370',
        artifacts: [
            {
                type: 'article',
                title: 'Official Investigation Report',
                description: 'Malaysian government investigation findings',
                url: 'https://en.wikipedia.org/wiki/Malaysia_Airlines_Flight_370'
            },
            {
                type: 'article',
                title: 'Satellite Data Analysis',
                description: 'Technical analysis of Inmarsat satellite pings',
                url: 'https://www.bbc.com/news/mh370'
            },
            {
                type: 'video',
                title: 'Investigation Documentary',
                description: 'Comprehensive analysis of the disappearance',
                url: 'https://www.youtube.com/results?search_query=mh370+documentary'
            }
        ]
    },
    {
        id: 'nazca-lines',
        title: 'The Nazca Lines of Peru',
        category: 'archaeological',
        difficulty: 'medium',
        briefing: `
            <p>Between 500 BCE and 500 CE, the Nazca culture created massive geoglyphs in the Peruvian desert - lines, geometric shapes, and figures of animals spanning up to 370 meters. These designs are so large they can only be fully appreciated from the air, yet they were created centuries before human flight.</p>
            <p>The purpose of these lines remains debated. Theories range from astronomical calendars to religious pathways, irrigation systems, or even alien landing sites. The precision and scale of the lines, created by removing the reddish pebble layer to reveal lighter ground beneath, is remarkable.</p>
            <p>Your mission: Investigate the archaeological evidence, astronomical alignments, and cultural context to determine why the Nazca people created these enormous desert drawings.</p>
        `,
        wikipedia: 'https://en.wikipedia.org/wiki/Nazca_Lines',
        artifacts: [
            {
                type: 'article',
                title: 'UNESCO World Heritage Site Documentation',
                description: 'Official archaeological records and research',
                url: 'https://en.wikipedia.org/wiki/Nazca_Lines'
            },
            {
                type: 'article',
                title: 'Scientific Analysis of Construction Methods',
                description: 'How the lines were created and preserved',
                url: 'https://www.nationalgeographic.com/nazca-lines'
            },
            {
                type: 'video',
                title: 'Aerial Survey Documentary',
                description: 'Drone footage and expert analysis',
                url: 'https://www.youtube.com/results?search_query=nazca+lines+documentary'
            }
        ]
    },
    {
        id: 'stonehenge',
        title: 'The Construction of Stonehenge',
        category: 'archaeological',
        difficulty: 'medium',
        briefing: `
            <p>Stonehenge, built between 3000 and 2000 BCE in Wiltshire, England, consists of massive sarsen stones weighing up to 25 tons and bluestones transported from Wales over 150 miles away. How Neolithic people moved and erected these enormous stones without modern technology remains a profound mystery.</p>
            <p>The monument's purpose is equally puzzling. Theories include an astronomical observatory, healing temple, burial site, or ceremonial center. Recent discoveries suggest it may have been part of a larger sacred landscape with multiple functions.</p>
            <p>Your mission: Examine archaeological evidence, astronomical alignments, and experimental archaeology to understand how and why Stonehenge was built.</p>
        `,
        wikipedia: 'https://en.wikipedia.org/wiki/Stonehenge',
        artifacts: [
            {
                type: 'article',
                title: 'English Heritage - Stonehenge Research',
                description: 'Official archaeological findings and theories',
                url: 'https://en.wikipedia.org/wiki/Stonehenge'
            },
            {
                type: 'article',
                title: 'Recent Archaeological Discoveries',
                description: 'New findings about the monument and surrounding area',
                url: 'https://www.smithsonianmag.com/stonehenge'
            },
            {
                type: 'video',
                title: 'Construction Theory Documentary',
                description: 'Experimental archaeology and building techniques',
                url: 'https://www.youtube.com/results?search_query=stonehenge+construction+documentary'
            }
        ]
    },
    {
        id: 'wow-signal',
        title: 'The Wow Signal from Space',
        category: 'scientific',
        difficulty: 'hard',
        briefing: `
            <p>On August 15, 1977, astronomer Jerry Ehman detected a strong narrowband radio signal while working on the SETI project at Ohio State University's Big Ear radio telescope. The signal lasted 72 seconds and appeared to come from the constellation Sagittarius. Ehman circled the data printout and wrote "Wow!" in the margin.</p>
            <p>The signal bore the expected hallmarks of an extraterrestrial transmission: it was at the hydrogen line frequency (1420 MHz), where natural transmissions are forbidden by international agreement. Despite numerous attempts, the signal has never been detected again.</p>
            <p>Your mission: Analyze the signal data, investigate natural and artificial explanations, and determine whether the Wow Signal could represent evidence of extraterrestrial intelligence.</p>
        `,
        wikipedia: 'https://en.wikipedia.org/wiki/Wow!_signal',
        artifacts: [
            {
                type: 'article',
                title: 'SETI Institute - Wow Signal Analysis',
                description: 'Technical analysis of the signal characteristics',
                url: 'https://en.wikipedia.org/wiki/Wow!_signal'
            },
            {
                type: 'article',
                title: 'Recent Theories and Investigations',
                description: 'Modern attempts to explain or replicate the signal',
                url: 'https://www.scientificamerican.com/wow-signal'
            },
            {
                type: 'video',
                title: 'SETI Documentary',
                description: 'The search for extraterrestrial intelligence',
                url: 'https://www.youtube.com/results?search_query=wow+signal+documentary'
            }
        ]
    },
    {
        id: 'mary-celeste',
        title: 'The Mary Celeste Ghost Ship',
        category: 'disappearance',
        difficulty: 'medium',
        briefing: `
            <p>On December 4, 1872, the merchant ship Dei Gratia discovered the Mary Celeste adrift in the Atlantic Ocean. The ship was seaworthy, fully provisioned, and carrying its cargo intact, but the crew of seven and the captain's family had vanished without a trace. The ship's lifeboat was missing.</p>
            <p>The last log entry was dated nine days earlier. Personal belongings, including valuable items, were left behind. The ship's papers were missing except for the captain's logbook. No signs of struggle, piracy, or violence were found.</p>
            <p>Your mission: Investigate the evidence, weather conditions, and crew backgrounds to determine what caused the entire crew to abandon a perfectly seaworthy ship.</p>
        `,
        wikipedia: 'https://en.wikipedia.org/wiki/Mary_Celeste',
        artifacts: [
            {
                type: 'article',
                title: 'Maritime Investigation Records',
                description: 'Official inquiry documents and testimony',
                url: 'https://en.wikipedia.org/wiki/Mary_Celeste'
            },
            {
                type: 'article',
                title: 'Modern Forensic Analysis',
                description: 'Contemporary theories and scientific explanations',
                url: 'https://www.smithsonianmag.com/mary-celeste'
            },
            {
                type: 'video',
                title: 'Maritime Mystery Documentary',
                description: 'Investigation of the ghost ship phenomenon',
                url: 'https://www.youtube.com/results?search_query=mary+celeste+documentary'
            }
        ]
    },
    {
        id: 'cicada-3301',
        title: 'The Cicada 3301 Puzzle',
        category: 'cryptographic',
        difficulty: 'hard',
        briefing: `
            <p>On January 4, 2012, a mysterious organization calling itself "3301" posted an intricate puzzle on internet forums, claiming to seek "highly intelligent individuals." The puzzle involved steganography, cryptography, ancient texts, and physical clues hidden around the world.</p>
            <p>Only a handful of people reportedly solved the puzzle, and those who did were allegedly recruited for an unknown purpose. Similar puzzles appeared in 2013 and 2014. The identity and purpose of Cicada 3301 remain unknown, with theories ranging from intelligence agency recruitment to an elaborate art project.</p>
            <p>Your mission: Analyze the puzzle structure, investigate the clues and solutions, and develop theories about who created Cicada 3301 and why.</p>
        `,
        wikipedia: 'https://en.wikipedia.org/wiki/Cicada_3301',
        artifacts: [
            {
                type: 'article',
                title: 'Cicada 3301 Puzzle Archive',
                description: 'Complete documentation of all puzzles and clues',
                url: 'https://en.wikipedia.org/wiki/Cicada_3301'
            },
            {
                type: 'article',
                title: 'Cryptographic Analysis',
                description: 'Technical breakdown of puzzle solutions',
                url: 'https://www.wired.com/cicada-3301'
            },
            {
                type: 'video',
                title: 'Internet Mystery Documentary',
                description: 'Investigation into the puzzle and its creators',
                url: 'https://www.youtube.com/results?search_query=cicada+3301+documentary'
            }
        ]
    },
    {
        id: 'shroud-turin',
        title: 'The Shroud of Turin',
        category: 'archaeological',
        difficulty: 'hard',
        briefing: `
            <p>The Shroud of Turin is a linen cloth bearing the faint image of a man who appears to have suffered physical trauma consistent with crucifixion. The Catholic Church has historically displayed it as the burial shroud of Jesus Christ, though it has never officially declared it authentic.</p>
            <p>Radiocarbon dating in 1988 suggested the shroud dates from the 13th-14th century, but critics argue the sample was contaminated or taken from a medieval repair. The image formation process remains unexplained - it's not paint, dye, or any known artistic technique.</p>
            <p>Your mission: Examine the scientific evidence, historical records, and image analysis to determine the shroud's age, authenticity, and how the image was created.</p>
        `,
        wikipedia: 'https://en.wikipedia.org/wiki/Shroud_of_Turin',
        artifacts: [
            {
                type: 'article',
                title: 'Scientific Analysis Reports',
                description: 'Radiocarbon dating and forensic studies',
                url: 'https://en.wikipedia.org/wiki/Shroud_of_Turin'
            },
            {
                type: 'article',
                title: 'Image Formation Studies',
                description: 'Research on how the image could have been created',
                url: 'https://www.nature.com/shroud-turin'
            },
            {
                type: 'video',
                title: 'Scientific Investigation Documentary',
                description: 'Analysis of the shroud and its mysteries',
                url: 'https://www.youtube.com/results?search_query=shroud+turin+documentary'
            }
        ]
    },
    {
        id: 'black-dahlia',
        title: 'The Black Dahlia Murder',
        category: 'disappearance',
        difficulty: 'hard',
        briefing: `
            <p>On January 15, 1947, the body of 22-year-old Elizabeth Short was found in a vacant lot in Los Angeles. The murder was particularly brutal - her body had been severed at the waist and drained of blood. Despite one of the largest investigations in LAPD history, the killer was never identified.</p>
            <p>The case attracted massive media attention, with Short posthumously nicknamed the "Black Dahlia" by newspapers. Over 60 people confessed to the murder, but none were credible. The case remains one of the most famous unsolved murders in American history.</p>
            <p>Your mission: Examine the evidence, investigate suspects, and analyze the investigation to develop theories about who killed Elizabeth Short and why.</p>
        `,
        wikipedia: 'https://en.wikipedia.org/wiki/Black_Dahlia',
        artifacts: [
            {
                type: 'article',
                title: 'LAPD Case Files',
                description: 'Official investigation documents and evidence',
                url: 'https://en.wikipedia.org/wiki/Black_Dahlia'
            },
            {
                type: 'article',
                title: 'Forensic Analysis',
                description: 'Modern examination of the evidence',
                url: 'https://www.fbi.gov/black-dahlia'
            },
            {
                type: 'video',
                title: 'True Crime Documentary',
                description: 'Investigation of suspects and theories',
                url: 'https://www.youtube.com/results?search_query=black+dahlia+documentary'
            }
        ]
    },
    {
        id: 'kryptos',
        title: 'The Kryptos Sculpture',
        category: 'cryptographic',
        difficulty: 'hard',
        briefing: `
            <p>In 1990, artist Jim Sanborn created Kryptos, a sculpture located at CIA headquarters in Langley, Virginia. The sculpture contains four encrypted messages. Three have been solved, but the fourth section - 97 characters - remains undeciphered after more than 30 years.</p>
            <p>The sculpture was commissioned by the CIA as a challenge to its employees. Even the NSA and top cryptographers worldwide have failed to crack the final section. Sanborn has released several clues over the years, but the message remains a mystery.</p>
            <p>Your mission: Study the solved sections, analyze Sanborn's clues, and attempt to crack the final encrypted message of Kryptos.</p>
        `,
        wikipedia: 'https://en.wikipedia.org/wiki/Kryptos',
        artifacts: [
            {
                type: 'article',
                title: 'CIA - Kryptos Challenge',
                description: 'Official information about the sculpture',
                url: 'https://en.wikipedia.org/wiki/Kryptos'
            },
            {
                type: 'article',
                title: 'Cryptographic Analysis',
                description: 'Attempts to solve the fourth section',
                url: 'https://www.wired.com/kryptos'
            },
            {
                type: 'video',
                title: 'Cipher Documentary',
                description: 'Investigation of the unsolved code',
                url: 'https://www.youtube.com/results?search_query=kryptos+sculpture+documentary'
            }
        ]
    }
];

/**
 * Generate a case based on hash
 * @param {string} hash - Case hash
 * @returns {Object} Case data
 */
function generateCase(hash) {
    // Use hash to deterministically select a case
    const seed = hashString(hash);
    const caseData = getRandomItem(CASE_SEEDS, seed);

    // Shuffle artifacts for variety
    const shuffledArtifacts = shuffleArray(caseData.artifacts, seed);

    return {
        hash: hash,
        title: caseData.title,
        category: caseData.category,
        difficulty: caseData.difficulty,
        briefing: caseData.briefing,
        wikipedia: caseData.wikipedia,
        artifacts: shuffledArtifacts.slice(0, Math.min(4, shuffledArtifacts.length))
    };
}

/**
 * Get all available case categories
 * @returns {Array} List of categories
 */
function getCaseCategories() {
    return [...new Set(CASE_SEEDS.map(c => c.category))];
}

/**
 * Get case by ID
 * @param {string} id - Case ID
 * @returns {Object} Case data
 */
function getCaseById(id) {
    return CASE_SEEDS.find(c => c.id === id);
}
