// ============================================================
// SBTI 科研版 — 人格类型定义 & 题库
// ============================================================

const PERSONALITIES = [
  {
    id: 'lit_review',
    name: '文献综述机器',
    emoji: '📚',
    tagline: '读了 100 篇论文，一个字没写',
    description: '你对文献的掌控力堪称恐怖。打开 Google Scholar 就像打开黑洞，回过神来已经下载了 50 篇 PDF，顺着 6 条引用链追踪到了 1972 年的某篇德文论文。你知道这个领域每一篇相关工作的来龙去脉，能在组会上脱口纠正演讲者的引用错误。但你的 Word 文档打开记录显示——你最常编辑的文件是 "References.bib"，而不是 "Manuscript.docx"。你的 Introduction 写了三个月还在改，因为每次搜文献都会发现新论文要加进去。',
    strength: '五分钟内定位任意一篇论文的学术谱系和引用网络',
    weakness: '永远在"再做一点文献调研就开始写"的循环里',
    traits: ['博学', '拖延', '完美主义'],
    advice: '你不是文献不够多，是开始写的勇气不够多。给自己定一个死线：下次打开 Google Scholar 之前，先在 Word 里敲 500 个字——哪怕写得很烂，也比不写强。Read less, write more。'
  },
  {
    id: 'p_hacker',
    name: '显著性星号收集者',
    emoji: '⭐',
    tagline: 'p < 0.05 就是真理',
    description: '你对 p 值的信仰比某些人对宗教还虔诚。你深知 p-hacking 是不对的——但毕业要紧。剔除几个"异常值"、换一种统计方法、加一两个协变量、对数据做一点"无害的"变换——突然，星星就出现了。你的论文里 Methods 部分那些统计检验是你跑的第 8 种方案，前 7 种不显著的你都没提。你的座右铭是 "If you torture the data long enough, it will confess"，但你在论文里写的却是 "following established statistical practices"。',
    strength: '精通所有能让 p 值降到 0.05 以下的正（歪）统（门）方（邪）法（道）',
    weakness: '看到 p = 0.051 时会开始怀疑人生并考虑是否要"调整一下分析策略"',
    traits: ['灵活', '执着', '选择性诚实'],
    advice: '考虑一下预注册（preregistration）？或者至少在做分析之前先写一个分析计划——不是给别人看，是给你自己看。如果实在管不住手，至少要在论文里坦诚你做了哪些分析。'
  },
  {
    id: 'ddl_warrior',
    name: 'DDL 战士',
    emoji: '⚔️',
    tagline: '每次都在截稿前夜通宵',
    description: '你的生产力曲线是一条陡峭的指数函数，在 DDL 前 6 小时达到峰值。你试过番茄钟、GTD、时间管理矩阵、每日打卡——但最终发现，肾上腺素才是唯一有效的时间管理工具。你在 23:58 提交论文，在大脑一片空白的状态下写完了最好的 Discussion。你的合作者们已经习惯了你最后一刻的爆发力——虽然每次都会让你的合作者短寿几年。你的生物钟是一个薛定谔的系统：没有 DDL 时你永远不知道自己是昼伏夜出还是昼出夜伏。',
    strength: '在截稿前 12 小时的产出超过别人一个月的积累',
    weakness: '前 29 天的产出为零，并且真诚地相信自己下次一定能提前开始',
    traits: ['爆发力强', '乐观', '咖啡因耐受极高'],
    advice: '你的潜力是真的很强，但你的肾上腺素不是可再生资源。试试一个 trick：把真正的 DDL 往前挪一周，自己骗自己。反正你每次都是最后一天才开始，那就让"最后一天"提前到来。'
  },
  {
    id: 'conference_social',
    name: '会议社交花',
    emoji: '🦋',
    tagline: '学术会议当公费旅游',
    description: '你的会议日程优先级：茶歇 > 晚宴 > 海报环节 > 口头报告。你参会的首要目的是更新朋友圈定位和收集 hashtag，其次是和大佬合个影（发推配文 "Honored to meet Prof. XXX!"），最后才是听报告。你收集的名片数量比论文数量多一个数量级，每一张你都拍了照存在某个永远不会再打开的文件夹里。但你确实是组里消息最灵通的人——谁拿到了教职、谁要跳槽去工业界、谁和谁在合作，你比 LinkedIn 还快。',
    strength: '一次会议能建立的人脉关系超过别人一年累积的',
    weakness: '但这些人脉大多停留在"我们在某次会议上见过"的尴尬社交距离',
    traits: ['社交达人', '消息灵通', '拍照技术一流'],
    advice: '你的人脉是你的超能力——但别忘了至少认真听一场 plenary。选一个你真正感兴趣的 talk，关掉手机，做一次笔记。社交和学术可以兼得，先学术再社交。'
  },
  {
    id: 'spaghetti_code',
    name: '代码屎山建筑师',
    emoji: '🍝',
    tagline: '代码只有自己能跑——有时候自己也不行',
    description: '你的代码是一座宏伟的、有机生长的、拥有自我意识的屎山。变量名是 a, aa, aaa, b, tmp, tmp2, final, FINAL。注释量为零——"代码就是最好的注释"是你最坚定的信仰。但神奇的是，你确实能在这座屎山中穿梭自如，找到需要修改的那一行。别人问你要代码时你会犹豫——不是因为隐私，而是因为你自己也不知道它当初是怎么跑通的了。每年你都会下定决心"下次要写干净的代码"，然后下一个 project 的 repo 名字叫 "final_v3_revised_FINAL"。',
    strength: '在无文档、无注释、无结构的混沌代码中找到并修复 bug 的超凡直觉',
    weakness: '三个月后打开自己的代码，需要同样的时间才能理解自己当时在想什么',
    traits: ['创造力惊人', '直觉强大', '文档恐惧症'],
    advice: '你不需要写完美的代码——你只需要在每次 commit 的时候写一行 commit message。真的，一行就行。三个月后的你会感谢现在的你。还有就是，别用 final_final_v2 这种命名了。'
  },
  {
    id: 'slacker',
    name: '实验室摸鱼王',
    emoji: '🎣',
    tagline: '看似在工位，实则在刷手机',
    description: '你的存在本身就是对"出勤即工作"这一管理理念的证伪。你熟练掌握了 Alt+Tab 的肌肉记忆，电脑屏幕上永远开着论文（作为壁纸），分屏里是 B 站/知乎/小说/股市行情。你对导师的步态有超凡的预判能力，总能提前 3 秒感知到他/她的靠近。但你并不是一无是处——你的摸鱼时间有 80% 花在了"和科研间接相关"的事上：看学术八卦、在知乎回答科研问题、研究新的效率工具（虽然从不真正使用）。你是一个"每小时产出最低但总能用巧劲完成任务"的矛盾存在。',
    strength: '能在极短时间内用别人 1/10 的精力完成任务——然后把剩下的时间高效摸鱼',
    weakness: '摸鱼和焦虑是同步增长的——看似在放松，实际内心一直在责怪自己',
    traits: ['反应快', '演技一流', '心理素质极强'],
    advice: '摸鱼是门艺术，但别让"摸鱼-焦虑-更摸鱼"的恶性循环困住你。试试每天只工作 4 小时——but during those 4 hours, actually work。你会发现其实不需要那么多"工位时间"。'
  },
  {
    id: 'missing_pi',
    name: '导师失踪人口',
    emoji: '👻',
    tagline: '除了需要签名时，永远找不到人',
    description: '你的导师的邮箱永远处于某种量子叠加态：既回复了又没回复。他/她可能在出差、可能在开会、可能在写基金、也可能只是单纯地不想回邮件。你对导师的指导方式已经从不理解到理解到接受——毕竟这意味着极度的学术自由。但这种自由的代价是：当你的毕业论文需要导师签字时，你不知道该往哪个城市寄。你的独立科研能力是被迫养成的——不是 mentor 教出来的，是靠自己摸索和隔壁实验室师兄的点拨。',
    strength: '被逼出来的超强独立科研能力和自我驱动力',
    weakness: '但对"正常的学术指导应该是什么样"完全没有概念',
    traits: ['自由', '独立', '被迫成长'],
    advice: '主动出击，不要等导师来找你。每周发一封简洁的邮件汇报进展，即使不回复也要发——这不是为了 ta，是为了给你自己留一个时间戳。同时，在外面找一个 co-mentor。'
  },
  {
    id: 'overachiever',
    name: '实验室卷王',
    emoji: '🏆',
    tagline: '007 是日常，实验室是第二个家',
    description: '你的存在让全组人压力山大。当别人还在睡觉时你已经在跑实验，当别人在刷剧时你在写论文，当别人在度假时你投稿了一篇会议。你的生产力曲线是一条没有低谷的直线。Google Scholar 提醒你比天气预报还频繁。但你的组员只想对你说一句话：周末请不要在群里发消息。你没有恶意——你只是真心觉得科研比生活有趣。你的实验室工位上备有牙刷、拖鞋和一张折叠床。',
    strength: '无与伦比的自律和执行能力，产出量碾压级领先',
    weakness: '让周围所有人都感到愧疚，且很难意识到自己的"正常"对别人来说是"极限"',
    traits: ['勤奋', '自律', '令人窒息'],
    advice: '你很好，但请别在周末和非工作时间发工作消息。把消息定时到周一早上。另外——每年做一次体检。你是组里产出最高的，但别成为组里最早倒下的。'
  },
  {
    id: 'rejection_collector',
    name: '论文被拒收藏家',
    emoji: '📬',
    tagline: '邮箱里全是拒稿信',
    description: '你对 "Thank you for your submission, however..." 已经脱敏了。从 Nature 一路投到 Scientific Reports，从顶刊到水刊——你收获的不是论文，而是经验值。你被拒的经历丰富多彩：desk reject、major revision 后 reject、两个 reviewer 意见截然相反被编辑 reject、格式不对被退回……你把拒稿信做成了一张 bingo 卡。但你从不服输——每一次被拒你都硬撑着改一改，然后投下一个。你的韧性比你的 h-index 高出几个数量级。',
    strength: '学术韧性满级，被拒次数和抗压能力成正比',
    weakness: '偶尔分不清"坚持"和"固执"的区别，可能在同一堵墙上撞了太多次',
    traits: ['坚韧', '乐观', '脸皮厚如城墙'],
    advice: '被拒不是失败——但你需要学会判断什么时候该放弃一篇 paper 投入下一项工作。有些文章被拒 5 次可能需要大改而非换个期刊。以及——记得把这些拒稿经历写进你的学术回忆录，那会是一本畅销书。'
  },
  {
    id: 'experiment_occult',
    name: '实验玄学大师',
    emoji: '🔮',
    tagline: '实验成不成功全看天意',
    description: '你做实验有一套严格的神秘仪式：必须用那支特定的移液枪、穿那双"吉利袜子"、在周五下午三点之前绝对不能碰离心机。你的实验成功率和月相之间存在某种你深信不疑但从未正式检验过的相关性。同一套 protocol，你做出来是黄金数据，师弟做出来是废铁。你无法解释为什么——你说这是"手气"。"上次成功了？好的，这次完全一样的条件再来一次"——然后失败了。你对"I just ran it again and it worked"这句话既痛恨又依赖。',
    strength: '能在完全相同的条件下神奇地获得完全不同的结果——且好的那一次通常发生在关键时刻',
    weakness: '对实验条件的记录精确到"今天天气晴，心情一般"，但漏掉了真正关键的变量',
    traits: ['仪式感', '直觉强大', '神秘主义'],
    advice: '你的"手气"可能背后有真实的、未被记录的变量在作祟。下次实验成功时，花十分钟把一切条件写下来——精确到试剂批号、房间温度、甚至谁在场。也许能破除一些迷信，也许会发现真有什么被忽略了。'
  },
  {
    id: 'grant_machine',
    name: '基金申请永动机',
    emoji: '💰',
    tagline: '一直在写本子，从未停止过',
    description: '你对全年基金申请时间表的熟悉程度超过了你对自己课题的熟悉。国自然、省基金、博后基金、横向项目、企业合作……你的 Word 里有一套经过千锤百炼的"立项依据"模板，每次只需替换关键词就能适配一个新的申请方向。你一年写 8 个本子，命中率 1/8——但你相信大数定律：只要写得够多，总会中的。你组里的经费有一半是你写本子写回来的，但你自己其实更想做实验而不是写本子。你被困在了一个悖论里：做实验需要经费，经费需要写本子，写本子占用了做实验的时间。',
    strength: '对经费来源和政策变化了如指掌，组里的"财神爷"',
    weakness: '写本子的时间比做研究的时间还长，已经快忘了自己做科研的初心',
    traits: ['坚持', '多线程', '乐观得可怕'],
    advice: '量很重要，但质更重要。挑一个你最看好的方向，花三个月认真打磨——而不是一个月写三个。一个好的本子胜过十个平庸的本子。还有，别忘了你是科学家，不是 grant writer。'
  },
  {
    id: 'ppt_artist',
    name: '组会 PPT 艺术家',
    emoji: '🎨',
    tagline: 'PPT 比论文精彩十倍',
    description: '你的组会 PPT 堪称艺术品：精美的流程图（用 PowerPoint 手绘的）、流畅的动画、完美的配色、信息密度恰到好处的排版。台下的组员们惊叹"这图怎么做的？"——但其实你的实验数据只有三行，而且其中两行是上次的结果。你花在 PPT 上的时间是实验的两倍还多。毕竟在你的哲学里——presentation matters more than results。你的 PPT 已经达到了可以当壁纸的水平，但你的实验记录还停留在便签纸上。',
    strength: '能把最平凡的数据用最精彩的视觉效果包装成令人信服的故事',
    weakness: '经常把做 PPT 当成做研究——视觉上的进展不等于科学上的进展',
    traits: ['审美在线', '表达力强', '重形式轻内容倾向'],
    advice: '你的视觉表达是真正的天赋——但别让它成为逃避实验的借口。把做 PPT 的时间分一半到实验上，你的研究质量会匹配上你的展示质量。或者考虑转行做科学可视化，那比写论文更赚钱。'
  },
  {
    id: 'reviewer2',
    name: '审稿人 2 号',
    emoji: '🔍',
    tagline: '对别人的工作永远不满意',
    description: '你在组会上最喜欢说的词是 "But..." 和 "However..."。你总能在一篇论文里精准地找出 50 个问题——从统计方法的假设不成立到某个逗号后面少了一个空格。你觉得自己的高标准是对科学的负责——但师兄弟们觉得你就是爱抬杠。你审稿时最常用的短语是 "It remains unclear whether..." 和 "The authors should also consider..."——后面跟的通常是你自己正在做的方向。你的 review 质量确实很高，但你的平均评分比别的审稿人低 1.5 分。',
    strength: '无与伦比的批判性思维和发现逻辑漏洞的能力',
    weakness: '在组会上说"No"的次数远超说"Yes"——这让你看起来像个负能量发射器',
    traits: ['严谨', '批判性思维', '嘴下不留情'],
    advice: '批判精神是科研的基石——但给反馈时记得 sandwich principle：先夸一句，再指出问题，最后再给个建设性建议。以及，在评审别人之前，先以同样的标准审视一下自己的论文——你的 Introduction 真的那么 novel 吗？'
  },
  {
    id: 'coffee_break',
    name: '茶歇永动机',
    emoji: '☕',
    tagline: '不是在喝咖啡就是在去喝咖啡的路上',
    description: '你的科研日常：到实验室 → 开机 → 泡咖啡 → 查邮件 → 喝咖啡 → 再去续一杯。你熟悉系楼里每一台咖啡机的脾气——知道哪台在周一会坏、哪台的美式偏酸、哪台的奶泡最绵密。你的理论是：咖啡因是科研的第一推动力。没有咖啡就没有生产力，没有茶歇就没有灵感。你确实在茶歇时有过几次重要的学术讨论——但你一周的茶歇总时长已经超过了你的正式工作时间。你把"coffee break"解释成了 lifestyle。',
    strength: '在茶歇和咖啡角建立了全系最广泛的 cross-disciplinary 社交网络',
    weakness: '一天的有效工作时间被切碎成若干个以"喝完这杯就干活"为起点的碎片',
    traits: ['社交广泛', '咖啡品鉴', '擅长短暂休息'],
    advice: '少喝一杯不会死。试试把咖啡从你的"开启工作仪式"中移除——直接开始干活。你可能会发现咖啡因并不是你需要的燃料。或者至少换 decaf，你已经够焦虑了。'
  },
  {
    id: 'star_collector',
    name: 'GitHub Star 收藏家',
    emoji: '🌟',
    tagline: 'Star 了一万个项目，一个没跑通过',
    description: '你的 GitHub Stars 数以千计——看到 "awesome-*" 就点星，看到 "state-of-the-art" 就 fork，看到 "all you need" 就 watch。你的收藏夹里整齐地排列着所有 SOTA 模型、经典算法的实现、科研工具合集。你的 "To Read" 列表比大多数人的毕业论文参考文献还长。你相信总有一天会用上这些 star——但不是今天。每当有人问"有没有 XX 相关的工具？"，你都能立刻甩出三个链接——虽然你自己也没用过。',
    strength: '信息检索能力超强，对前沿工具和开源生态了如指掌',
    weakness: '收藏了全世界最先进的工具但自己的代码环境连 numpy 版本都不兼容',
    traits: ['信息敏感', '收藏癖', '未来导向'],
    advice: '关掉 GitHub Trending 页面。打开你 star 列表里的第一个项目——clone，run，用起来。哪怕只真正使用过一个你 star 的项目，也比收藏一百个有价值。'
  },
  {
    id: 'equipment_debug',
    name: '设备调试大师',
    emoji: '🔧',
    tagline: '一半科研时间在修仪器',
    description: '你的实验技能不是在操作仪器中习得的，而是在修仪器中练成的。你对仪器故障的诊断比对你实验结果的分析更有经验。你的简历上有一项隐藏技能：精通本领域所有常见设备的重启、拍打、断电、清洁和"让它自己冷静一会儿"。你曾经用一把螺丝刀、一卷胶带和一瓶酒精把一个二十年的老仪器救活——厂家的技术支持都来请教你。但你的 paper 一作是那台被修好的仪器，因为它占据了你一整个学期。',
    strength: '动手能力极强，任何仪器出问题你都是全组第一个被想到的人',
    weakness: '变成了全组的"免费技术支持"，修仪器的时间远超做自己课题的时间',
    traits: ['动手能力强', '耐心', '被仪器耽误的科学家'],
    advice: '你修仪器的经验本身就是一篇 methodology paper——seriously。写一篇 troubleshooting guide，被引率可能比你真正的 research paper 还高。还有，学会说"我也不懂，叫厂家吧"。'
  },
  {
    id: 'data_vanish',
    name: '数据消失术士',
    emoji: '💨',
    tagline: '数据总是莫名其妙丢了',
    description: '你和数据八字不合。U 盘丢了、硬盘坏了、云同步出了 bug、被自己 rm -rf 了、重装系统忘了备份、手机进水丢了一个月的原始数据——你在实验室安全培训里每一个反面案例都亲身体验过。你第一次丢数据时哭了，第二次暴怒，第三次开始变得佛系——"数据来也匆匆去也匆匆"。现在你学会了接受失去。你的 lab notebook 上有一页专门记录"数据遗失编年史"。',
    strength: '对数据恢复工具和备份方案的使用经验异常丰富（可惜每次都是出事之后才用）',
    weakness: '每次都说"这次我一定做好备份"，然后下次还是没做',
    traits: ['佛系', '记忆力好', '心太大'],
    advice: '3-2-1 备份法则：3 copies, 2 different media, 1 offsite。现在就去设置。立刻。马上。不是明天——明天你的硬盘就会坏。已经被数据丢了三次的你，这次真的要信。'
  },
  {
    id: 'theory_perfect',
    name: '理论完美实际零',
    emoji: '🏛️',
    tagline: '定理推得优美，落地等于没做',
    description: '你的 LaTeX 里写满了优美的定理、引理和证明。但你的"Assumptions"那一页比你的"Results"还长。你的方法在满足 12 个理想假设下是 SOTA——但现实世界不满足其中任何一个。你的 simulation 结果完美支持你的理论，但 real data 一放进去就崩了。审稿人喜欢你文章的 elegance，但每次都会问同一个问题："Does it work on real-world datasets?" 你的回答永远在下一版 paper 的 "Future Work" 里。',
    strength: '数学功底深厚，能从第一性原理推导出优雅的理论框架',
    weakness: '在"假设条件"的舒适区里待太久，对 messy real-world data 有发自内心的恐惧',
    traits: ['数学强', '想象力丰富', '脱离实际倾向'],
    advice: '理论很美——但至少要有一个 real-data experiment。哪怕结果不完美，也比纯 simulation 的 paper 有说服力。找一个做实验的合作伙伴，让 ta 帮你把理论拉回地面。'
  },
  {
    id: 'excel_god',
    name: 'Excel 战神',
    emoji: '📊',
    tagline: '什么都能用 Excel 搞定',
    description: '谁说 Excel 不能做科研？你的数据分析在 Excel 里，图表在 Excel 里，实验记录在 Excel 里，甚至你的论文大纲都是 Excel 做的。Python？R？MATLAB？不需要——你有 VLOOKUP、PivotTable 和条件格式。你把 Excel 用成了别人认不出来的软件。当同龄人在学 PyTorch 时，你在钻研 Excel 的 Power Query。你的图表有一种独特的复古美感——别人用的 seaborn 做出来的图和你用 Excel 做出来的图一眼就能区分。你不是不会编程，你只是觉得 Excel 已经够用。',
    strength: '能把 Excel 用到图灵完备的程度——别人需要写代码，你只需要写公式',
    weakness: '遇到百万行级别的数据时会发现 Excel 的行数限制比你想象的更早到来',
    traits: ['实用主义', 'Excel 宗师', '对新技术礼貌拒绝'],
    advice: 'Excel 很强大——但下次处理大数据时试试 pandas？就一次。你可能会发现 Python 做 Excel 擅长的事也很方便，而且能处理 Excel 打不开的文件。至少学一下 Python 读取 Excel，这是你踏入编程世界的最低门槛。'
  },
  {
    id: 'salami_slicer',
    name: '灌水达人',
    emoji: '🌊',
    tagline: 'Salami slicing 专家，一个数据集能拆成五篇',
    description: '你深谙论文拆解的"最小可发表单元"理论。一个研究可以写成五篇：换一个指标是一篇，换一个数据集是一篇，加一个对比方法是一篇，删掉对比方法是一篇，综述自己的前四篇是第五篇。你的 Google Scholar 曲线斜率很可观，但每一篇的贡献都像是从同一根香肠上切下来的薄片。你不在意别人怎么说——"publish or perish"，先 publish 再说 perish。你的 h-index 在同级里名列前茅，但你心里清楚那里面有多少是真正的突破。',
    strength: '极高效的产出能力和对"可发表阈值"的精准把握',
    weakness: '数量上去了但影响力没跟上——citation 主要来自于自己的后续灌水',
    traits: ['高效', '策略思维', '道德包袱较轻'],
    advice: '灌水是一种生存策略——但偶尔也要认认真真做一篇有分量的工作。一篇高影响力的论文比十篇灌水论文对你的职业发展更有帮助。给未来的自己留一点骄傲的资本。'
  },
  {
    id: 'submission_phobia',
    name: '拒稿恐惧症',
    emoji: '😰',
    tagline: '论文改了一百遍还是不敢投',
    description: '你的论文草稿已经迭代了 50 版以上。每次觉得差不多可以投了，你总能找出新的问题——某个词不够精准、某张图的配色不够专业、某个引用可能不够全面、审稿人会不会质疑你的 method 选择……你的导师已经催了你四个月了。你的合作者也快被你逼疯了。你知道自己可能在过度完美主义——但你更怕被拒。讽刺的是，这已经导致了比被拒更糟糕的后果：论文根本不存在。完美是优秀的敌人，而你是这句话的活体示范。',
    strength: '极度严谨，对自己工作的每个细节都有深入的思考和把控',
    weakness: '"再改一改就投" → 永远不会投 —— 完美主义成了 procrastination 的最佳借口',
    traits: ['追求极致', '焦虑', '自我要求过高'],
    advice: '最坏的结果只是一封拒稿信——你已经预先体验了五十遍。给你自己设一个"强制提交日"：到了那天，不管你觉得改没改完，必须按 submit。让导师或合作者帮你执行这个 deadline——你需要的是推动你的人，不是另一个给你提修改意见的人。'
  },
  {
    id: 'lab_ghost',
    name: '实验室幽灵',
    emoji: '🦇',
    tagline: '永远半夜出现在实验室',
    description: '你的生物钟属于另一个时区。白天补觉，晚上实验。据说是因为晚上做实验不用排队等仪器——但你的导师怀疑你只是单纯不喜欢人类。深夜的实验室是你的王国：只有通风橱的低鸣、你播放的深夜歌单、和偶尔转动的离心机。安保大叔是唯一知道你还活着的人。凌晨三点是你思考最清楚的时候——虽然发邮件给合作者时你要小心别暴露了发送时间。你的白天组员很少见到你本人，他们怀疑你是一个 AI bot。',
    strength: '在无人打扰的深夜拥有比白天高两倍的效率和创造力',
    weakness: '错过了所有白天才发生的社交、讨论和机会——包括导师找你谈话',
    traits: ['独立', '夜猫子', '社恐倾向'],
    advice: '夜间效率高没问题——但每周至少出现一次在白天，让同事们知道你还活着。以及定期 check email 和消息——导师凌晨三点不会回你，但你下午三点应该看到他/她的回复。'
  },
  {
    id: 'locust',
    name: '学术蝗虫',
    emoji: '🦗',
    tagline: '茶歇的糕点最先消失，会议纪念品最先入袋',
    description: '你是 seminar、workshop 和任何提供免费食物的学术活动的忠实参与者。你对系里哪家 catering 的甜点最好吃、哪个会议送的 tote bag 最好用、哪种 workshop 的餐标最高如数家珍。你的工位堆满了各大学术会议的帆布袋、杯子、笔记本和圆珠笔——每一个都是一场免费午餐的纪念。你不是去听报告的，你是去进货的。但你有一个秘密：你确实在茶歇时听过一些有价值的讨论——只是你没告诉任何人，因为这不符合你"只关心吃"的人设。',
    strength: '对学术活动的非学术价值（食物、礼品、社交）有着敏锐的嗅觉',
    weakness: '参加的 workshop 数量很多，但真正认真听的报告比例成谜',
    traits: ['手速快', '信息灵通', '精打细算'],
    advice: '既然都来拿了免费午餐，至少认真听一场报告。你可能会发现那些 talk 其实挺有意思的。而且——拿纪念品的时候留一些给别人，特别是那些限量款。'
  },
  {
    id: 'first_author',
    name: '一作争夺者',
    emoji: '🥇',
    tagline: '为了一作可以据理力争',
    description: '你对 authorship 分配规则的研究深度超过了对你自己课题的研究。你清楚地知道谁做了多少贡献、排第几位、共一算不算、co-first 的顺序谁在前。每个项目开始前你就已经在脑子里分配好了作者顺序。你不觉得这是心机——你觉得自己只是尊重规则的玩家。你对贡献度的量化可以精确到"谁洗了第几批瓶子"。师弟师妹们对你又敬又怕——敬你的专业，怕有一天和你合作时要和你讨论 authorship。',
    strength: '对自己的学术贡献有清晰的认知和坚定的维权意识',
    weakness: '有时过度关注 credits 分配而影响了合作关系，被人认为"太计较"',
    traits: ['有原则', '精明', '竞争意识强'],
    advice: '保护自己的权益是对的——但要分清楚什么时候该争、什么时候该让。一个合作愉快但你是二作的长期项目，可能比一个闹掰了的一作论文对你的职业生涯更有帮助。人缘也是学术资本。'
  },
  {
    id: 'citation_ocd',
    name: '引用格式强迫症',
    emoji: '📝',
    tagline: '参考文献必须一个空格不差',
    description: '你能肉眼分辨 APA 6th 和 APA 7th 的差异。你的 Zotero/Endnote 库整理得像图书馆分类系统——每个条目都有完整的元数据、正确的作者全名、准确的 DOI。你会在投稿前手动逐条校验每一个 citation，发现过很多莫名其妙的引用错误——包括引用的论文根本没说过那句话。你花了八小时调整引用格式，但 Introduction 的内容还是上次的草稿。你觉得这是对学术规范的尊重，你的合作者觉得你有病——两者都是对的。',
    strength: '变态级别的细节把控能力，你的引用从不出错',
    weakness: '把时间花在了工具能自动完成的事情上，而核心内容被搁置',
    traits: ['极致细心', '秩序感', '选择性拖延'],
    advice: '格式交给 Zotero/BibTeX 就好——它们比你更擅长 consistency。你的那八个小时应该用来写正文，而不是纠结 et al. 后面有没有逗号。审稿人真的不会逐条检查你的引用格式——但他们会看你有没有内容。'
  },
  {
    id: 'eternal_phd',
    name: '十年博后',
    emoji: '⏳',
    tagline: '读了十年还没毕业',
    description: '你的工龄比系里某些助理教授还长。新生来的时候你在，新生毕业的时候你还在。系里的行政人员换了几波，只有你是永恒的。你帮过的人有的成了副教授，有的去了工业界当总监，有的已经转行开了咖啡店。你比谁都更了解这个系的文化——因为你已经亲眼见证了一个完整的学代更替。你已经成为了实验室的精神图腾——新生的第一课是"有问题去问 XX，ta 什么都知道"。你并不觉得这是失败——只是你的 timeline 和世界的不太一样。',
    strength: '知识深度和广度无人能及，是整个系的 living archive',
    weakness: '已经不确定到底是"还在追求完美"还是"害怕离开舒适区"',
    traits: ['知识渊博', '坚韧', '时运不济'],
    advice: '不是读得越久就越厉害。如果已经超过第七年——认真问自己一个问题：我是在打磨一个伟大的工作，还是在逃避就业市场？给自己定一个毕业日期，定下来就不改了。世界上有很多地方需要一个像你这样有经验的人——不只是学术界。'
  },
  {
    id: 'chatgpt_addict',
    name: 'ChatGPT 依赖症',
    emoji: '🤖',
    tagline: '没有 AI 就不会写论文',
    description: '你的浏览器固定标签页就是 ChatGPT、Claude 和 Grammarly。写标题问 AI、改摘要问 AI、回复同事邮件问 AI、生成实验计划问 AI、写代码问 AI、debug 问 AI——你甚至用 AI 帮你想了"我不会过度依赖 AI"的理由。你对自己的 prompt engineering 能力感到自豪——那些精心设计的提示词确实产生了看起来很不错的内容。但你有时会突然恐慌：当脱离 AI 时，自己还剩下什么？你最怕的不是 ChatGPT 宕机，而是有人发现你的"思考"其实是 prompt 的结果。',
    strength: '能高效利用 AI 工具大幅提升产出效率，prompt engineering 达到专业水平',
    weakness: '独立思考能力在悄悄退化，越来越难以在没有 AI 的情况下完成需要深度思考的任务',
    traits: ['技术适应快', '效率高', 'AI 依赖'],
    advice: 'AI 是工具不是替代品。试着每周做一件"不用 AI"的事：读一篇论文并自己做笔记、写一段 introduction 不借助 AI 润色、画一个手稿级别的图。保持你的肌肉记忆——你的大脑是你最不应该外包的东西。'
  },
  {
    id: 'equipment_killer',
    name: '设备杀手',
    emoji: '💀',
    tagline: '经手的仪器必坏',
    description: '实验室的仪器似乎和你磁场不合。你碰过的东西第二天必出故障——哪怕你只是从旁边路过。同组的人看见你靠近仪器会下意识地警戒，有人甚至在仪器上贴了"请勿靠近"的便利贴。你被禁止在重要实验前碰任何仪器。你觉得自己被仪器诅咒了——但客观来说，你确实有"拧旋钮力度偏大"和"离心机配平注意不到小数点后两位"的问题。你是实验室安全培训中的经典反面教材——但你是真心想改的。',
    strength: '对仪器故障模式有着独特的、亲身体验式的深刻认知',
    weakness: '仪器对你的恐惧已经形成了真实的物理障碍',
    traits: ['破坏力强', '自我认知清晰', '被全组警惕'],
    advice: '慢下来。读 manual。读两遍。每一个步骤做完确认后再做下一步。你不是被诅咒——你只是太快了。另外，给自己买一份仪器保险——或者至少请管理仪器的同事吃顿饭。'
  },
  {
    id: 'plan_never_do',
    name: '永远在计划',
    emoji: '📋',
    tagline: '计划完美，执行为零',
    description: '你的 Notion 模板是组里公认最精美的——彩色标签、甘特图、番茄钟集成、自动提醒。你每周日晚上的 planning session 比任何周会都认真：OKR 拆解、milestone 设定、buffer 预留、风险评估。你在计划中完成了所有事情——唯独没有在现实中完成任何事情。星期一来临时你又觉得"plan needs to be adjusted"——然后开始了一轮新的调整。你的计划本身已经成为一种行为艺术。你不是没能力执行，你是把"做计划"当成了"做事"。',
    strength: '极强的组织规划能力和对复杂项目的全局把控视野',
    weakness: '在优化计划中获得了和实际执行一样的满足感——但前者不产生论文',
    traits: ['组织力强', '工具控', '执行力弱'],
    advice: '别做计划了。对，就是现在——关掉 Notion，打开你的编辑器，选一件今天就能完成的小事，做它。计划是一种 drug——你需要的不是更好的计划，是 zero planning 的执行。试一天。'
  },
  {
    id: 'industry_spy',
    name: '工业界卧底',
    emoji: '🕵️',
    tagline: '读 PhD 只是为了润工业界',
    description: '你从入学第一天就明确了人生规划：PhD = 工业界的入场券。你选课题的标准不是 novelty 而是"对公司面试有用吗"。你评估每一件事的标准是简历价值——能写上去的就是有价值的。你的 LinkedIn 比 Google Scholar 更新更频繁，你的 GitHub 有精心维护的 project portfolio。同组的博士同学们有时会在背后说你"目的性太强"——但你想的是，他们毕业时也会和你抢同一个岗位。你心里清楚，你不会想念学术界的——但你会在离职那天发一条感性朋友圈。',
    strength: '目标极度明确，不被学术界的虚荣指标迷惑，职业规划清晰',
    weakness: '在学术界显得"灵魂不在此处"，可能错过了学术训练中一些无功利但有益的部分',
    traits: ['目标明确', '务实', '坦诚'],
    advice: '既然目标清晰，就充分利用 PhD 期间的资源。学你想学的技能、做你想做的项目——但别彻底放弃对科学本身的兴趣。工业界喜欢的不是"讨厌学术的人"，而是"热爱科学但更想落地的人"。顺便帮同组同学内推——人脉是你未来最宝贵的资产。'
  }
];

// ============================================================
// 31 道题目 — 每题 3 个选项，映射到人格类型
// 每个选项的 scores 记录 { personality_id: weight }
// ============================================================

const QUESTIONS = [
  {
    id: 1,
    text: '周五下午 4:55，导师在群里 @你："周末有空的话，把上次那个结果跑一下，周一早会想看看。" 你心里想的是？',
    options: {
      A: {
        text: '"有空"的定义是什么？我没空。装作没看到，周一早上再说"啊我周末在搬家/看病/断网"',
        scores: { slacker: 1.0, lab_ghost: 0.4 }
      },
      B: {
        text: '认命。打开外卖 app 先点个晚饭——今晚注定是个不眠夜。然后在心里默默问候了一遍学术界的工作文化',
        scores: { ddl_warrior: 1.0, overachiever: 0.4 }
      },
      C: {
        text: '立刻开始做详细的周末计划：周六上午跑实验、下午处理数据、周日画图。计划完美。周一早上你确实有东西——一个没执行完的计划',
        scores: { plan_never_do: 1.0, lit_review: 0.5 }
      }
    }
  },
  {
    id: 2,
    text: '为了写 Introduction 搜了一篇相关论文，两个小时后你发现自己正在干什么？',
    options: {
      A: {
        text: '在读一篇 1972 年的德文论文的英文译本，内容和你原本的课题只有"都使用了显微镜"这个共同点',
        scores: { lit_review: 1.0, eternal_phd: 0.3 }
      },
      B: {
        text: '在维基百科上查这篇论文第三作者的生平——他的人生故事太精彩了，比你的课题有意思多了',
        scores: { slacker: 1.0, coffee_break: 0.5 }
      },
      C: {
        text: '已经整理好 47 条 Zotero 条目、设置了 12 个标签层级、还顺手给 Zotero 写了个插件。但 Introduction 还是空的',
        scores: { citation_ocd: 1.0, plan_never_do: 0.5 }
      }
    }
  },
  {
    id: 3,
    text: '你发现了一个让你激动的科研 idea，半夜三点从床上坐起来。然后你做了什么？',
    options: {
      A: {
        text: '在手机备忘录激情记录了三行字。第二天醒来看到，以为是梦中呓语，删了继续睡',
        scores: { plan_never_do: 1.0, lab_ghost: 0.5 }
      },
      B: {
        text: '爬起来打开电脑开始写 proposal，写到早上六点直接去实验室。你导师生病时都没这么拼',
        scores: { overachiever: 1.0, ddl_warrior: 0.5 }
      },
      C: {
        text: '翻来覆去想到天亮，越想越觉得这个 idea 已经被别人做过了。算了，继续睡吧——虽然已经六点半了',
        scores: { lit_review: 0.7, submission_phobia: 0.7 }
      }
    }
  },
  {
    id: 4,
    text: '学术会议上，茶歇时间你端着咖啡站在人群边缘。有人开始聊你的 poster。你怎么应对？',
    options: {
      A: {
        text: '露出标准的"我对自己的研究很自信"微笑，用三句以内讲完——趁他们还没发现你的大部分结果是拼凑的',
        scores: { ppt_artist: 1.0, conference_social: 0.5 }
      },
      B: {
        text: '从背景到方法到未来展望讲了 15 分钟，停下来发现对方只是在等你换气好借口离开',
        scores: { overachiever: 0.5, lit_review: 1.0 }
      },
      C: {
        text: '讨论了两句后发现旁边桌在摆新的糕点，眼神开始漂移——"不好意思我先去……那边看一下"',
        scores: { locust: 1.0, coffee_break: 0.5 }
      }
    }
  },
  {
    id: 5,
    text: '你的实验/代码终于跑通了，但你说不清为什么——改了 17 个参数，不知道是哪一步起效的。你的态度是？',
    options: {
      A: {
        text: '不要碰它。不要看它。不要试图理解它。打开论文模板，趁它还活着赶紧写 Method 部分',
        scores: { spaghetti_code: 1.0, salami_slicer: 0.5 }
      },
      B: {
        text: '焦虑。你觉得这比跑不通还可怕——至少跑不通你知道有问题。现在这算什么？薛定谔的正确？',
        scores: { experiment_occult: 1.0, submission_phobia: 0.5 }
      },
      C: {
        text: '花了 8 个小时试图搞清楚原因。最后得出结论：可能是 cosmic ray 导致的比特翻转',
        scores: { experiment_occult: 0.5, reviewer2: 0.5, equipment_debug: 0.5 }
      }
    }
  },
  {
    id: 6,
    text: '一篇跟你的课题 90% 相似的论文出现在了 arXiv 上，比你早了一周。你已经做了大半年的工作。你什么反应？',
    options: {
      A: {
        text: '瘫坐在椅子上，盯着天花板沉默了五分钟。然后开始疯狂找他们工作的漏洞——一定有什么是他们没做到的',
        scores: { reviewer2: 1.0, first_author: 0.5 }
      },
      B: {
        text: '冷静。打开他们的论文和自己的结果做对比，仔细标注差异化 contribution。然后把 Introduction 重写成"in contrast to concurrent work…"',
        scores: { lit_review: 0.5, salami_slicer: 0.5, rejection_collector: 0.3 }
      },
      C: {
        text: '大怒→沮丧→接受→开始重新思考人生→打开 BOSS 直聘。半年白干了，工业界多香啊',
        scores: { industry_spy: 1.0, eternal_phd: 0.5 }
      }
    }
  },
  {
    id: 7,
    text: '系里安排了一场 seminar，演讲者是诺贝尔奖得主。但时间是下午两点——你平时午睡的时间。你去不去？',
    options: {
      A: {
        text: '必去。提前半小时抢第一排座位。结束后冲上去合影，LinkedIn/Twitter/朋友圈三连发',
        scores: { conference_social: 1.0, overachiever: 0.5 }
      },
      B: {
        text: '不去现场。默默打开 Zoom 链接（如果有的话），边听边在工位上摸鱼。大牛的声音当背景白噪音',
        scores: { slacker: 0.7, coffee_break: 0.7 }
      },
      C: {
        text: '不去。诺贝尔奖得主的 talk 一般都是科普向的，对具体研究帮助不大——这是你说的，其实你只是不想离开工位',
        scores: { lab_ghost: 1.0, missing_pi: 0.5 }
      }
    }
  },
  {
    id: 8,
    text: '你在写论文的 Acknowledgement 部分。你的第一反应是？',
    options: {
      A: {
        text: '打开 ChatGPT："写一个标准的论文致谢模板，语气真诚但不肉麻，顺便感谢一下那些我没认真听过的审稿意见"',
        scores: { chatgpt_addict: 1.0, spaghetti_code: 0.5 }
      },
      B: {
        text: '认真感谢导师的"指导"（虽然最后一次见面是三个月前）、感谢基金资助（虽然钱早花完了）、感谢家人的"支持"（虽然他们根本不知道你在研究什么）',
        scores: { missing_pi: 0.5, grant_machine: 0.5, rejection_collector: 0.5 }
      },
      C: {
        text: '先查一下致谢有没有引用格式规范。确认"thanks to"和"grateful to"的细微差别后，花了一下午写了五行致谢',
        scores: { citation_ocd: 1.0, submission_phobia: 0.5 }
      }
    }
  },
  {
    id: 9,
    text: '你得到了一次做会议口头报告的机会。但你的实验结果还差一个关键数据。距离会议还有两个月。你怎么准备？',
    options: {
      A: {
        text: '先把 PPT 做得漂漂亮亮——动画、流程图、配色全上。数据那页先放"Preliminary Results"，万一做不出来就把字号调小一点',
        scores: { ppt_artist: 1.0, ddl_warrior: 0.3 }
      },
      B: {
        text: '立刻投入实验试图在两个月内补上数据。每天给仪器上香。倒数一周时如果还不行，准备 Plan B：现场画饼',
        scores: { experiment_occult: 0.7, overachiever: 0.7 }
      },
      C: {
        text: '想退出但已经晚了。接下来两个月每天焦虑到凌晨三点，反复检查 presentation 里每个可能被质疑的点。你会成为自己最害怕的人——你自己的 Reviewer #2',
        scores: { submission_phobia: 1.0, reviewer2: 0.5 }
      }
    }
  },
  {
    id: 10,
    text: '你看到实验室公用的移液枪被上一个用的人调到了最大量程，而且没有复位。你的内心？',
    options: {
      A: {
        text: '血压直接拉满。在心里把全组人都审判了一遍。然后小心地调回去——但你没有在群里说，因为你不想当那个"每次都抱怨的人"',
        scores: { overachiever: 0.5, lab_ghost: 0.5, reviewer2: 0.3 }
      },
      B: {
        text: '拍照片发群里，配文"谁用完了没复位？🙂"。那个微笑 emoji 承载了你全部的愤怒。然后私聊导师反映实验室纪律问题',
        scores: { first_author: 0.5, citation_ocd: 0.5, equipment_killer: 0.3 }
      },
      C: {
        text: '算了，你也经常忘记。Karma。默默地调好，假装什么都没发生。然后忘了复位给下一个人——轮回继续',
        scores: { slacker: 1.0, coffee_break: 0.5 }
      }
    }
  },
  {
    id: 11,
    text: '导师三个月没回你邮件了，你论文的初稿还躺在他/她的邮箱里。今天在走廊偶遇了。他/她说什么？',
    options: {
      A: {
        text: '"哦！你的邮件！我看到了，最近太忙了，这周末一定看！"——你心里清楚，这个"周末"和你论文的 submission 一样，永远在路上',
        scores: { missing_pi: 1.0, eternal_phd: 0.5 }
      },
      B: {
        text: '"你那个方向我没跟进，你自己多看看文献吧，差不多就投出去"——这大概是他/她给你最详细的指导了',
        scores: { missing_pi: 0.5, ddl_warrior: 0.5, salami_slicer: 0.3 }
      },
      C: {
        text: '他/她没认出你。你们擦肩而过。你站在原地消化了五秒钟，然后去买了杯咖啡',
        scores: { coffee_break: 1.0, eternal_phd: 0.7 }
      }
    }
  },
  {
    id: 12,
    text: '论文投稿后三个月，审稿意见终于回来了。一个 Reviewer 给了 minor revision，另一个给了 reject。编辑给了 major revision。你的策略是？',
    options: {
      A: {
        text: '逐条分析那个 reject 审稿人的意见，写了 15 页的 rebuttal letter，引用 30 篇文献来证明他是错的。编辑看了都替审稿人尴尬',
        scores: { reviewer2: 1.0, rejection_collector: 0.5 }
      },
      B: {
        text: '把那个 reject 审稿人的意见挑几条容易改的改了，剩下的一律用"We respectfully disagree"和"this is beyond the scope of the current work"挡回去',
        scores: { salami_slicer: 0.7, ddl_warrior: 0.5, chatgpt_addict: 0.3 }
      },
      C: {
        text: '看到 reject 两个字后心态崩了，把邮件关掉三天没看。第四天打开，发现编辑的 deadline 只剩一周了',
        scores: { submission_phobia: 1.0, slacker: 0.7 }
      }
    }
  },
  {
    id: 13,
    text: '组会上，导师问大家"还有什么问题吗？"全场沉默。实际上你有一堆问题，但你在想什么？',
    options: {
      A: {
        text: '你不提问是因为你觉得这些问题太蠢——如果只有你不懂，那就是你的问题。宁可会后Google，绝不当众暴露无知',
        scores: { submission_phobia: 0.7, lab_ghost: 0.7 }
      },
      B: {
        text: '你不提问是因为你已经开始计划午饭吃什么了。组会已经超时 15 分钟了——导师，放我们走吧',
        scores: { slacker: 1.0, locust: 0.5 }
      },
      C: {
        text: '你在内心准备了一个很深刻的问题，但在斟酌措辞的时候，导师说"那好，散会"——你已经反复经历这个场景三年了',
        scores: { plan_never_do: 0.7, eternal_phd: 0.5, lit_review: 0.3 }
      }
    }
  },
  {
    id: 14,
    text: '你接手了一个师兄留下的代码/实验体系。你看了一眼，发现——',
    options: {
      A: {
        text: '没有注释。变量名是 a1, a2, b1, b2, tmp, tmp2, final, final_final, final_usethisone。你决定从头重写。但三个月后你发现自己写的也差不多',
        scores: { spaghetti_code: 1.0, equipment_debug: 0.5 }
      },
      B: {
        text: '有一个 200 行的 README，但和实际代码完全对不上。README 里写的"一键运行"其实是"一键报错"。你怀疑师兄是故意的',
        scores: { equipment_debug: 0.7, equipment_killer: 0.5, star_collector: 0.3 }
      },
      C: {
        text: '看不懂但也不敢问——师兄已经毕业去了大厂，LinkedIn 上晒着高薪 offer。你默默打开 ChatGPT 开始一行行问"这段代码是什么意思"',
        scores: { chatgpt_addict: 1.0, industry_spy: 0.3 }
      }
    }
  },
  {
    id: 15,
    text: '你在 GitHub 上找到了一个号称能解决你问题的开源项目。Star 2k，最后一次 commit 是两年前，issue 区 87 个未关闭。你怎么办？',
    options: {
      A: {
        text: 'Star。Fork。Clone。跑。报错。Google 报错。改两行。继续报错。放弃。然后继续 Star 下一个类似的 repo——循环开始',
        scores: { star_collector: 1.0, spaghetti_code: 0.5 }
      },
      B: {
        text: '花了整个下午读了源码，发现作者写死了随机种子、hardcode 了路径、还有个内存泄漏。修好后提了个 PR——虽然你知道作者大概率不会 merge',
        scores: { equipment_debug: 1.0, overachiever: 0.3 }
      },
      C: {
        text: '把 README 贴给 ChatGPT："帮我用 pytorch 实现这个 paper 的核心思想，不要用那个烂代码"。30 分钟后你有了自己的版本——虽然也不知道对不对，但至少跑通了',
        scores: { chatgpt_addict: 1.0, spaghetti_code: 0.5 }
      }
    }
  },
  {
    id: 16,
    text: '你得到了一笔小的会议 travel grant，但只够机票+注册费。酒店和吃饭还得自己贴。你怎么安排？',
    options: {
      A: {
        text: '立刻查会议城市有什么免费景点和便宜青旅。在你的 Excel 表里精确计算每一块钱。这笔"投资"要转化成 LinkedIn 上至少 5 个新 connection',
        scores: { industry_spy: 0.5, locust: 0.5, grant_machine: 0.5 }
      },
      B: {
        text: '找三个不认识的人拼一间房——在学术 Twitter 上发帖"找人合住！"。你会认识一些这辈子只见这一面的朋友',
        scores: { conference_social: 1.0, rejection_collector: 0.5 }
      },
      C: {
        text: '算了太麻烦了。反正线上也能听。用这笔钱升级了你的电脑——虽然不是 travel grant 的本意，但生产力确实提高了',
        scores: { slacker: 0.7, lab_ghost: 0.5, plan_never_do: 0.3 }
      }
    }
  },
  {
    id: 17,
    text: '你正在申请博后/教职，需要提交 research statement。你的写作策略是？',
    options: {
      A: {
        text: '把 PhD 期间所有沾边的 project 都包装成一个宏大的、连贯的、有远见的研究纲领。"我的研究将彻底改变人类对 XX 的理解"——虽然你 PhD 主要在做 Excel',
        scores: { ppt_artist: 0.7, grant_machine: 1.0 }
      },
      B: {
        text: '实事求是地写。你相信学术圈是公平的——真诚最能打动人。然后你的申请石沉大海。三个月后你听说拿到 offer 的人 research statement 写了"用 AI 拯救世界"',
        scores: { rejection_collector: 0.7, submission_phobia: 0.5, eternal_phd: 0.3 }
      },
      C: {
        text: '你还没写。截止日期还有三天——你有一个精美的 LaTeX 模板和一个空白的 content。剩下三天你会通宵搞定',
        scores: { ddl_warrior: 1.0, plan_never_do: 0.5 }
      }
    }
  },
  {
    id: 18,
    text: '实验室来了个新师妹/师弟，导师让你带。你对这件事的态度是？',
    options: {
      A: {
        text: '开心！终于有人分担工作了。认真做了一份 onboarding 文档，从实验 protocol 到系楼 WiFi 密码一应俱全',
        scores: { overachiever: 0.7, citation_ocd: 0.5, equipment_debug: 0.3 }
      },
      B: {
        text: '内心抗拒但表面答应。给了她几篇论文看，说"先熟悉一下领域，有问题随时问我"——然后希望她不要来问',
        scores: { slacker: 0.7, missing_pi: 0.7 }
      },
      C: {
        text: '警惕。TA 是不是导师找来接替我工作的？我的课题是不是要被分出去了？暗中观察 TA 的一举一动',
        scores: { first_author: 0.7, eternal_phd: 0.5, industry_spy: 0.3 }
      }
    }
  },
  {
    id: 19,
    text: '你花了三周跑了一个复杂的实验/仿真，结果和你预期的彻底相反。你第一反应是什么？',
    options: {
      A: {
        text: '完了。白做了。开始怀疑人生。然后打开 GitHub 看看工业界的招聘要求——虽然你知道自己还是会继续做科研',
        scores: { eternal_phd: 0.7, rejection_collector: 0.5, industry_spy: 0.3 }
      },
      B: {
        text: '等等——"相反"也是结果！说不定这恰恰说明了一个更深刻的机制！立刻开始文献调研，看有没有人报道过类似现象。你闻到了 novelty 的味道',
        scores: { lit_review: 1.0, reviewer2: 0.5 }
      },
      C: {
        text: '检查数据、检查代码、检查参数、检查仪器。找到一个 bug——修复后结果就符合预期了。长舒一口气。但你没意识到这可能已经是你的第五次"选择性 debug"了',
        scores: { p_hacker: 1.0, experiment_occult: 0.5 }
      }
    }
  },
  {
    id: 20,
    text: '你发现自己的文章被一篇新发表的综述引用了。你很兴奋地去看是怎么引的——',
    options: {
      A: {
        text: '引是引了，但你的名字拼错了。而且他们把你的工作归类到了一个你根本没做过的领域。你不确定是被冒犯了还是被夸了',
        scores: { rejection_collector: 0.7, citation_ocd: 0.5, coffee_break: 0.3 }
      },
      B: {
        text: '他们把你的文章和另外两篇堆在一起，写了句"several studies have explored this topic [12-14]"——没有展开，没有讨论，就像你的工作只是一条参考文献的填充物',
        scores: { overachiever: 0.3, first_author: 0.5, reviewer2: 0.5 }
      },
      C: {
        text: '他们引了你的文章但只引用了一个无关紧要的边角料结论——完全忽略了你最引以为傲的核心 contribution。你觉得这比不被引用还难受',
        scores: { first_author: 0.7, overachiever: 0.5, reviewer2: 0.3 }
      }
    }
  },
  {
    id: 21,
    text: '你的论文被 desk rejected 了五次。这次你终于收到了送审通知。但 Reviewer #2 让你补一个"理论上可行但从来没人做成功过"的实验。你怎么办？',
    options: {
      A: {
        text: '做。虽然觉得不合理，但为了发出去拼了。花三个月尝试——不出所料失败了。然后写一封很长的 rebuttal 解释为什么这个实验不可行',
        scores: { rejection_collector: 1.0, equipment_debug: 0.5 }
      },
      B: {
        text: '在 response 里引用三篇文献证明这个实验在原理上就有问题。"We believe this experiment is not feasible due to [citation] [citation] [citation]"——语气礼貌，但这三篇都是你自己组的论文',
        scores: { reviewer2: 0.7, lit_review: 0.5, first_author: 0.3 }
      },
      C: {
        text: '假装做了。在回复里写"We attempted this experiment but the results were inconclusive due to [合理的借口]"。ChatGPT 帮你润色了这段话让它听起来非常诚恳',
        scores: { chatgpt_addict: 0.7, salami_slicer: 0.5, spaghetti_code: 0.3 }
      }
    }
  },
  {
    id: 22,
    text: '你在博士四年级，论文数量为零。导师说"别急，厚积薄发"。同期入学的同学已经发了两篇顶刊。你晚上躺在床上在想什么？',
    options: {
      A: {
        text: '"厚积薄发"到底要多厚？我已经积了四年了。开始怀疑自己是不是不适合做科研。然后又觉得导师在安慰我——但他确实也没给我什么指导',
        scores: { eternal_phd: 1.0, missing_pi: 0.5, submission_phobia: 0.3 }
      },
      B: {
        text: '打开电脑开始把现有结果拼成一篇论文。质量不重要，先投出去再说。大不了被拒——反正抽屉里还有三个 project',
        scores: { ddl_warrior: 0.5, salami_slicer: 0.7, rejection_collector: 0.3 }
      },
      C: {
        text: '打开招聘网站开始浏览工业界职位。定了一个底线：如果第五年还没文章，就 quit。但这个底线你已经画了三次了——每次都在往后退',
        scores: { industry_spy: 0.7, eternal_phd: 0.5, plan_never_do: 0.3 }
      }
    }
  },
  {
    id: 23,
    text: '研究生院办了一个"学术写作工作坊"，老师说自愿参加。你去不去？',
    options: {
      A: {
        text: '去。免费的东西不能错过。而且工作坊中间有茶歇——你已经在计算几块饼干能值回你的时间成本',
        scores: { locust: 1.0, coffee_break: 0.5 }
      },
      B: {
        text: '不去。你的学术写作水平不需要培训——你的 ChatGPT prompt 已经写得比论文还长了',
        scores: { chatgpt_addict: 1.0, spaghetti_code: 0.3 }
      },
      C: {
        text: '去，但你全程都在下面改自己的论文。讲师讲学术写作规范时，你正在用不规范的方式改你的 Discussion',
        scores: { ddl_warrior: 0.5, overachiever: 0.5, slacker: 0.5 }
      }
    }
  },
  {
    id: 24,
    text: '系里的年终晚宴上，导师喝了两杯酒之后开始讲他当年 PhD 的故事。你已经听过第三遍了。你怎么办？',
    options: {
      A: {
        text: '认真听，点头，在合适的地方发出"哇""真的吗""太厉害了"。你已经在心里把这话术练成了肌肉记忆',
        scores: { conference_social: 1.0, overachiever: 0.5 }
      },
      B: {
        text: '假装在听，实际上在看手机。偶尔抬头和导师对视时露出一个"我在认真听"的微笑，然后继续刷手机',
        scores: { slacker: 1.0, coffee_break: 0.3 }
      },
      C: {
        text: '你在想导师的 PhD 是多久之前的事了——他读博时候的科研环境和你现在面对的完全不一样。那时候发一篇论文就够了。你喝了口酒，把这句话咽了下去',
        scores: { eternal_phd: 0.7, rejection_collector: 0.5, lab_ghost: 0.3 }
      }
    }
  },
  {
    id: 25,
    text: '你的合作者发来一封邮件，标题是"Urgent: need your data by tonight"。你打开附件——她/他已经在写论文了，但你之前完全不知道这篇论文的存在。你的数据被列在 Table 1 里。你怎么办？',
    options: {
      A: {
        text: '立刻回复所有人（包括她/他的导师），明确提出需要讨论 authorship 和数据使用权限。抄送了自己的导师——虽然你导师可能不会看',
        scores: { first_author: 1.0, reviewer2: 0.5 }
      },
      B: {
        text: '把数据发过去但加了一行注释：你的分析方法是错的。顺便发了一段更正的代码。你帮了她/他，但也要让她/他知道你才是对的',
        scores: { overachiever: 0.5, equipment_debug: 0.5, spaghetti_code: 0.3 }
      },
      C: {
        text: '算了，反正数据放那也是放着。有人愿意写论文就写吧，能在作者列表里出现就行。你已经在想这篇论文能排在简历第几行了',
        scores: { salami_slicer: 0.5, eternal_phd: 0.3, coffee_break: 0.5 }
      }
    }
  },
  {
    id: 26,
    text: '一个本科生找到你，说想跟你做暑研。你的实验室其实没什么适合本科生做的简单项目。你怎么处理？',
    options: {
      A: {
        text: '接。给他一个独立的小项目——你知道自己指导能力一般，但你相信本科生需要被给一个机会。他后来帮你洗了三个月瓶子，但至少简历好看了一点',
        scores: { overachiever: 0.5, equipment_debug: 0.5, citation_ocd: 0.3 }
      },
      B: {
        text: '委婉拒绝。"今年的名额满了，明年来吧"——虽然你知道明年你也还会这么说。你只是不想为别人负责，你自己的实验都顾不过来',
        scores: { lab_ghost: 0.7, slacker: 0.5, missing_pi: 0.3 }
      },
      C: {
        text: '接。然后把他交给组里最勤快的师弟——"带本科生也是锻炼你的指导能力"。师弟不敢拒绝，本科生也不知道发生了什么。你金蝉脱壳',
        scores: { missing_pi: 0.7, first_author: 0.5, slacker: 0.3 }
      }
    }
  },
  {
    id: 27,
    text: '你在整理实验记录准备写论文时，发现一年前的某次实验数据似乎比现在的更好——但你已经忘了当时用的是什么条件。你的实验记录本上只写了"今天做了实验"。',
    options: {
      A: {
        text: '根据记忆和散落的电子记录拼凑实验条件。拼出了 70%，剩下的 30% 靠推理。"应该就是这些条件……吧？"',
        scores: { experiment_occult: 1.0, spaghetti_code: 0.5 }
      },
      B: {
        text: '决定从那之后开始规范记录——买了一个漂亮的新 lab notebook，头两周写得很认真，第三周开始出现空白页，一个月后回到了"今天做了实验"的水平',
        scores: { plan_never_do: 1.0, equipment_debug: 0.3 }
      },
      C: {
        text: '放弃那些好数据。没法复现的结果等于不存在。这是你科研生涯中学到的最痛苦的一课——然后你继续不写实验记录',
        scores: { data_vanish: 1.0, rejection_collector: 0.5 }
      }
    }
  },
  {
    id: 28,
    text: '你的实验室有个不成文的传统：谁的论文被接受了就带吃的来庆祝。今天轮到你了——但你是一个讨厌社交且厨艺为零的人。你怎么应付？',
    options: {
      A: {
        text: '提前在超市买了最贵的进口饼干和巧克力，摆在一个好看的盘子里，看起来像是手工的。没人发现。你站在角落里，等大家拿完就悄悄回去做实验',
        scores: { lab_ghost: 1.0, conference_social: 0.3 }
      },
      B: {
        text: '在群里发消息说"我周末做了布朗尼！"——其实是楼下 bakery 买的。你把盒子扔在了楼道垃圾桶以防被发现。心虚但值得',
        scores: { slacker: 0.7, first_author: 0.3, ppt_artist: 0.3 }
      },
      C: {
        text: '你什么都没带。你说"忘记发了"。其实你记得——你只是觉得这个传统很蠢。接受=庆祝？你更想一个人安静地庆祝。比如回家躺平',
        scores: { lab_ghost: 0.5, missing_pi: 0.5, coffee_break: 0.5 }
      }
    }
  },
  {
    id: 29,
    text: '有一天你路过本科生的公告栏，看到他们在组队参加竞赛，题目正好是你 PhD 做了三年的东西。你什么感觉？',
    options: {
      A: {
        text: '想凑过去说"这个我熟！"，然后意识到自己可能比评委问的问题还多——决定还是不打扰他们了。走开时顺手纠正了他们海报上一个小错误',
        scores: { citation_ocd: 0.5, reviewer2: 0.5, overachiever: 0.3 }
      },
      B: {
        text: '站在旁边默默看了五分钟。他们讨论的那些东西你三年前就研究过——但你从来没想过把它做成一个竞赛项目。你开始怀疑自己的科研到底产生了什么影响',
        scores: { eternal_phd: 0.7, rejection_collector: 0.5, lit_review: 0.3 }
      },
      C: {
        text: '你完全没注意。你正赶着去买咖啡——今天的第三杯',
        scores: { coffee_break: 1.0, slacker: 0.5 }
      }
    }
  },
  {
    id: 30,
    text: '博士最后一年，你要写毕业论文了。你打算把之前发表的几篇论文拼成 thesis。打开第一篇论文的原始数据——你发现代码跑不通了，因为环境早就变了。',
    options: {
      A: {
        text: '花了一周重建当年的环境。发现是 Python 3.6 到 3.10 的 breaking change。最终跑通了——然后发誓这次一定要用 Docker。最后你用了 Docker 但没写 Dockerfile，只是截图留了个念',
        scores: { equipment_debug: 1.0, spaghetti_code: 0.5 }
      },
      B: {
        text: '放弃复现。在 thesis 里写"结果详见 [published paper]"。反正论文已经发表了，审稿人都通过了——谁敢质疑你？你的答辩委员会估计也不会看这么细',
        scores: { spaghetti_code: 0.5, salami_slicer: 0.7, ddl_warrior: 0.3 }
      },
      C: {
        text: '把数据拷进 Excel，手动生成了一组图表。和发表的结果差不多——肉眼看不出来差异。你在 thesis 的 methodology 部分写道"data analysis was performed using standard statistical software"',
        scores: { excel_god: 1.0, experiment_occult: 0.5 }
      }
    }
  },
  {
    id: 31,
    text: '最后一道题。这 31 道题做下来，你觉得这个"科研版 SBTI"是什么水平？',
    options: {
      A: {
        text: '离谱但精准。这里面描述的每一种人我都认识，有些甚至就是我自己。笑着笑着就哭了——这大概就是科研人的 PTSD 吧',
        scores: { rejection_collector: 0.5, eternal_phd: 0.5, coffee_break: 0.5 }
      },
      B: {
        text: '纯属娱乐，毫无科学依据。但我已经截好图准备发朋友圈了——"我是 XX 类型！有人一样的吗？"',
        scores: { conference_social: 0.5, ppt_artist: 0.5, chatgpt_addict: 0.3 }
      },
      C: {
        text: '我不需要做测试——我已经在科研圈活成了所有类型的综合体。31 题不够，你至少需要 100 题才能覆盖我二十年的学术生涯',
        scores: { eternal_phd: 1.0, reviewer2: 0.3 }
      }
    }
  }
];
