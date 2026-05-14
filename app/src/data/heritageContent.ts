export type GuideMode = 'child' | 'visitor' | 'study';
export type RouteId = 'architecture' | 'people' | 'familyStudy';

export interface RelatedPersonContent {
  name: string;
  role: string;
  description: string;
  avatarType: 'laoshe' | 'kang' | 'architect' | 'ai';
}

export interface BuildingHeritageContent {
  buildingId: string;
  guideScripts: Record<GuideMode, string>;
  oneMinuteStory: string;
  relatedPeople: RelatedPersonContent[];
  storyTags: string[];
  nearbyBuildings: string[];
  routeIds: RouteId[];
  checkinTitle: string;
  miniProgramPath: string;
  qrImageUrl: string;
  checkinTasks: string[];
  archiveImages: Array<{
    id: string;
    year: number;
    periodLabel: string;
    title: string;
    caption: string;
    imageUrl: string;
    type: 'building' | 'street' | 'person' | 'today' | 'archive';
    imageStatus?: 'placeholder' | 'ready';
  }>;
  encounterCharacter: {
    name: string;
    role: string;
    avatarType:
      | 'architect'
      | 'planner'
      | 'tower'
      | 'photographer'
      | 'traveler'
      | 'postman'
      | 'factory'
      | 'writer'
      | 'thinker'
      | 'seaside';
    unlockText: string;
    greeting: string;
  };
}

export interface RouteContent {
  id: RouteId;
  name: string;
  description: string;
  buildingIds: string[];
}

export const ROUTE_CONTENT: RouteContent[] = [
  {
    id: 'architecture',
    name: '建筑线',
    description: '串联青岛老城代表性建筑，适合第一次了解城市风貌。',
    buildingIds: [
      'governor-residence',
      'governor-office',
      'jiangsu-road-church',
      'st-michael-cathedral',
      'qingdao-railway-station',
    ],
  },
  {
    id: 'people',
    name: '名人线',
    description: '从老舍、康有为等人物故居进入青岛的人文记忆。',
    buildingIds: [
      'laoshe-residence',
      'kang-youwei-residence',
      'governor-residence',
      'jiangsu-road-church',
    ],
  },
  {
    id: 'familyStudy',
    name: '亲子研学线',
    description: '用任务打卡和故事讲解，带孩子认识老建筑与城市历史。',
    buildingIds: [
      'qingdao-railway-station',
      'post-museum',
      'tsingtao-brewery',
      'st-michael-cathedral',
      'huashi-building',
    ],
  },
];

export const DEFAULT_RELATED_PEOPLE: RelatedPersonContent[] = [
  {
    name: '历史讲述人',
    role: 'AI 伴游角色',
    description: '我会带你从建筑、街区和城市记忆三个角度认识这里。',
    avatarType: 'ai',
  },
];

function createArchiveImages(
  baseId: string,
  entries: Array<{
    suffix: string;
    year: number;
    periodLabel: string;
    title: string;
    caption: string;
    type: 'building' | 'street' | 'person' | 'today' | 'archive';
  }>
) {
  return entries.map((entry) => ({
    id: `${baseId}-${entry.suffix}`,
    year: entry.year,
    periodLabel: entry.periodLabel,
    title: entry.title,
    caption: entry.caption,
    imageUrl: `images/archive/${baseId}-${entry.suffix}.jpg`,
    type: entry.type,
    imageStatus: 'placeholder' as const,
  }));
}

export const HERITAGE_CONTENT: Record<string, BuildingHeritageContent> = {
  'governor-residence': {
    buildingId: 'governor-residence',
    guideScripts: {
      child: '你有没有发现，这栋楼的屋顶像童话里的小城堡？站在这样的山地建筑前，我们可以一边看红瓦和石墙，一边想象青岛老城为什么会把山、路和房子连在一起。试着看看它是怎么顺着地势展开的，这就是认识老城空间的第一步。',
      visitor: '来到德国总督楼旧址，最值得感受的不是某一个细节，而是整座建筑和山海城市之间的关系。红瓦、坡屋顶、石墙和高处视角一起构成了青岛老城的经典印象，也让这里成为理解近代城市风貌的一个醒目入口。',
      study: '如果把这里作为研学观察点，可以重点看三件事：第一，建筑如何顺应山地地形展开；第二，德式官邸的体量、屋顶和立面如何表达秩序；第三，从高处视角怎样理解青岛老城“山、海、城、楼”交织的格局。',
    },
    oneMinuteStory: '站在德国总督楼旧址前，最容易被记住的是它像城堡一样的屋顶和山地上的位置。对今天的游客来说，这里不只是看一栋老楼，更像是在读青岛老城的开篇。红瓦、石墙、坡屋顶和高低起伏的道路，让建筑和城市地形紧紧连在一起。从这里出发，我们可以理解青岛老城为什么总带着一种既靠海又依山的独特气质。',
    relatedPeople: [
      { name: '城市建筑师', role: '城市规划', description: '适合从道路、坡地和建筑体量的关系理解老城格局。', avatarType: 'architect' },
      { name: '历史讲述人', role: 'AI 伴游角色', description: '把建筑外观和城市记忆转换成更容易理解的漫游故事。', avatarType: 'ai' },
    ],
    storyTags: ['德式建筑', '山地城市', '红瓦绿树', '城市记忆'],
    nearbyBuildings: ['governor-office', 'jiangsu-road-church', 'laoshe-residence'],
    routeIds: ['architecture', 'people'],
    checkinTitle: '德国总督楼旧址实地打卡',
    miniProgramPath: 'pages/building/detail?id=governor-house',
    qrImageUrl: 'images/qrcodes/governor-house-checkin.png',
    checkinTasks: ['到达现场，激活人物偶遇', '听 1 分钟建筑故事', '完成一个建筑观察问题', '拍照打卡，领取数字徽章'],
    archiveImages: createArchiveImages('governor-house', [
      { suffix: 'early', year: 1900, periodLabel: '1900年代初', title: '早期建筑影像', caption: '用于展示建筑早期风貌与最初的城市环境。', type: 'building' },
      { suffix: 'street', year: 1930, periodLabel: '1920-1930年代', title: '老城街景', caption: '从周边街区观察建筑与道路、坡地和城市空间的关系。', type: 'street' },
      { suffix: 'archive', year: 1950, periodLabel: '城市记忆', title: '城市记忆', caption: '记录建筑在青岛近代城市叙事中的位置与文化气质。', type: 'archive' },
      { suffix: 'change', year: 1980, periodLabel: '1980年代', title: '建筑保存观察', caption: '用于观察这栋建筑在城市变迁中的保存状态。', type: 'archive' },
      { suffix: 'today', year: 2025, periodLabel: '今日', title: '今日外观', caption: '用于和历史影像对照观察建筑的当下状态。', type: 'today' },
    ]),
    encounterCharacter: {
      name: '老城建筑师',
      role: '建筑观察向导',
      avatarType: 'architect',
      unlockText: '到达德国总督楼旧址附近后，可激活老城建筑师偶遇。',
      greeting: '你已经来到德国总督楼旧址附近。我是老城建筑师，接下来我会带你从屋顶、石墙和山海关系，看懂这座建筑为什么能代表青岛老城气质。',
    },
  },
  'governor-office': {
    buildingId: 'governor-office',
    guideScripts: {
      child: '这类建筑看起来会不会比普通住宅更庄重一点？我们可以试着找找它为什么显得“像办公的地方”：比如更规则的立面、更明确的入口，还有和道路、广场之间的关系。这样就能看懂老城里的公共建筑是怎么工作的。',
      visitor: '青岛德国总督府旧址适合和周边街区一起看。它让人看到，老城里除了好看的红瓦建筑，也有承担城市治理和公共秩序的空间。建筑本身的庄重感，加上和道路、广场的关系，让这里成为理解老城规划逻辑的重要一站。',
      study: '研学时可以把这里当作“行政建筑样本”来观察：建筑尺度如何区别于普通住宅，空间秩序怎样传达公共性，以及它和周边道路、山地街区如何共同构成近代城市治理的空间框架。',
    },
    oneMinuteStory: '青岛德国总督府旧址常常不会像教堂那样第一眼夺目，但它很适合用来理解一座城市早期是怎样被组织起来的。行政建筑的庄重、道路和广场的联系、老城街区的结构，都能在这里找到线索。对演示平台来说，它提醒我们，文旅讲解不只是看风景，也可以带人看见城市秩序是怎样被设计出来的。',
    relatedPeople: [
      { name: '城市建筑师', role: '城市规划', description: '从公共建筑和道路组织的关系进入老城规划逻辑。', avatarType: 'architect' },
      { name: '历史讲述人', role: 'AI 伴游角色', description: '把行政空间讲成游客也能听懂的城市治理故事。', avatarType: 'ai' },
    ],
    storyTags: ['行政建筑', '城市治理', '老城规划', '公共建筑'],
    nearbyBuildings: ['governor-residence', 'jiangsu-road-church', 'laoshe-residence'],
    routeIds: ['architecture'],
    checkinTitle: '青岛德国总督府旧址实地打卡',
    miniProgramPath: 'pages/building/detail?id=governor-office',
    qrImageUrl: 'images/qrcodes/governor-office-checkin.png',
    checkinTasks: ['到达现场，激活人物偶遇', '听 1 分钟建筑故事', '完成一个建筑观察问题', '拍照打卡，领取数字徽章'],
    archiveImages: createArchiveImages('governor-office', [
      { suffix: 'early', year: 1900, periodLabel: '1900年代初', title: '早期建筑影像', caption: '用于观察行政建筑的早期立面与公共尺度。', type: 'building' },
      { suffix: 'street', year: 1930, periodLabel: '1920-1930年代', title: '老城街景', caption: '从道路和街区关系理解城市治理空间。', type: 'street' },
      { suffix: 'archive', year: 1950, periodLabel: '城市记忆', title: '城市档案', caption: '作为青岛老城行政空间的重要线索。', type: 'archive' },
      { suffix: 'change', year: 1980, periodLabel: '1980年代', title: '城市变迁中的建筑', caption: '用于观察这栋建筑在城市更新中的保存状态。', type: 'archive' },
      { suffix: 'today', year: 2025, periodLabel: '今日', title: '今日外观', caption: '便于和历史影像一起观察当代展示状态。', type: 'today' },
    ]),
    encounterCharacter: {
      name: '城市规划官',
      role: '老城秩序讲述人',
      avatarType: 'planner',
      unlockText: '到达青岛德国总督府旧址附近后，可激活城市规划官偶遇。',
      greeting: '欢迎来到青岛德国总督府旧址。这里不只是一栋办公建筑，也是观察青岛近代城市秩序的入口。跟我一起看看道路、广场和建筑之间的关系。',
    },
  },
  'jiangsu-road-church': {
    buildingId: 'jiangsu-road-church',
    guideScripts: {
      child: '你有没有发现，教堂的钟楼很像一个站在街口的“方向标”？在青岛老城这样的坡路里，钟楼常常会先被看见。我们可以一边找屋顶，一边找路的转折，看看建筑是怎么和街巷一起组成城市风景的。',
      visitor: '江苏路基督教堂很适合慢慢靠近。你会先看到钟楼轮廓，再看到红瓦屋顶，最后感受到它和坡路、街巷之间的关系。对很多游客来说，这种“走着走着忽然看见老教堂”的瞬间，就是青岛老城最有味道的部分。',
      study: '如果作为研学点，这里可以重点观察钟楼如何提供方向感、宗教建筑如何在坡地街区中形成识别点，以及红瓦屋顶、立面语言和街巷尺度怎样共同塑造老城视觉秩序。',
    },
    oneMinuteStory: '江苏路基督教堂最迷人的地方，是它从来不是孤零零地站在一块空地上，而是和坡路、街口、树荫和老城屋顶一起出现。钟楼让它成为方向感很强的建筑，红瓦又把它拉进了青岛老城共同的视觉气质里。对游客来说，这里既适合拍照，也适合停下来重新认识“建筑和街巷如何一起构成城市记忆”。',
    relatedPeople: [
      { name: '历史讲述人', role: 'AI 伴游角色', description: '引导游客从钟楼、街巷和红瓦景观看懂这处地标。', avatarType: 'ai' },
    ],
    storyTags: ['宗教建筑', '钟楼', '红瓦', '老城街巷'],
    nearbyBuildings: ['governor-residence', 'governor-office', 'laoshe-residence'],
    routeIds: ['architecture', 'people'],
    checkinTitle: '江苏路基督教堂实地打卡',
    miniProgramPath: 'pages/building/detail?id=jiangsu-church',
    qrImageUrl: 'images/qrcodes/jiangsu-church-checkin.png',
    checkinTasks: ['到达现场，激活人物偶遇', '听 1 分钟建筑故事', '完成一个建筑观察问题', '拍照打卡，领取数字徽章'],
    archiveImages: createArchiveImages('jiangsu-church', [
      { suffix: 'early', year: 1910, periodLabel: '1910年代', title: '早期教堂影像', caption: '用于展示钟楼与红瓦屋顶的历史风貌。', type: 'building' },
      { suffix: 'street', year: 1930, periodLabel: '1920-1930年代', title: '坡路街景', caption: '从街巷关系里理解宗教建筑的方向感。', type: 'street' },
      { suffix: 'person', year: 1950, periodLabel: '人物记忆', title: '人物记忆', caption: '适合连接老城漫游、钟楼观察和文化记忆。', type: 'person' },
      { suffix: 'change', year: 1980, periodLabel: '1980年代', title: '街区变化', caption: '用于观察教堂与周边街区关系在城市变迁中的延续。', type: 'archive' },
      { suffix: 'today', year: 2025, periodLabel: '今日', title: '今日对比', caption: '对照今天的街口视角和建筑识别度。', type: 'today' },
    ]),
    encounterCharacter: {
      name: '钟楼守望者',
      role: '老城方向感向导',
      avatarType: 'tower',
      unlockText: '到达江苏路基督教堂附近后，可激活钟楼守望者偶遇。',
      greeting: '你听见钟声了吗？我是钟楼守望者。站在这里，你可以观察钟楼、坡路和红瓦屋顶，它们共同构成了青岛老城最有辨识度的画面。',
    },
  },
  'st-michael-cathedral': {
    buildingId: 'st-michael-cathedral',
    guideScripts: {
      child: '如果你从远处看见两座高高的塔，是不是会马上知道自己快到老城核心了？圣弥厄尔教堂最适合玩“找塔尖”的游戏。试着看看它为什么比周围建筑更容易被记住，这也是认识城市地标的一种方式。',
      visitor: '圣弥厄尔教堂常常是游客记住青岛老城的第一幅画面。双塔、红瓦、街区和拍照人群一起构成了这里的城市记忆。来到这里，可以一边感受教堂外观的辨识度，一边把它和中山路、老城街区的漫游体验连在一起。',
      study: '这里适合用来观察城市地标如何形成：双塔立面怎样建立远距离识别，宗教建筑如何与商业街区发生关系，以及老城天际线为什么会因为一个清晰的建筑轮廓而更容易被记住。',
    },
    oneMinuteStory: '圣弥厄尔教堂像是青岛老城天际线里最容易辨认的一个停顿。双塔立面让它远远就能被看见，而靠近以后，你又会发现它和周边街路、行人、拍照点位共同构成了一种很典型的城市体验。很多人回忆青岛老城时，不一定先想起哪条路，却很容易想起塔尖、红瓦和街区一起出现的那一幕。',
    relatedPeople: [
      { name: '历史讲述人', role: 'AI 伴游角色', description: '带你从双塔、街区和城市影像记忆进入这处地标。', avatarType: 'ai' },
    ],
    storyTags: ['城市地标', '双塔', '中山路', '城市天际线'],
    nearbyBuildings: ['qingdao-railway-station', 'post-museum', 'jiangsu-road-church'],
    routeIds: ['architecture', 'familyStudy'],
    checkinTitle: '圣弥厄尔教堂实地打卡',
    miniProgramPath: 'pages/building/detail?id=st-michael-cathedral',
    qrImageUrl: 'images/qrcodes/st-michael-cathedral-checkin.png',
    checkinTasks: ['到达现场，激活人物偶遇', '听 1 分钟建筑故事', '完成一个建筑观察问题', '拍照打卡，领取数字徽章'],
    archiveImages: createArchiveImages('st-michael-cathedral', [
      { suffix: 'early', year: 1930, periodLabel: '1930年代', title: '双塔老影像', caption: '用于观察双塔地标与老城天际线的关系。', type: 'building' },
      { suffix: 'street', year: 1940, periodLabel: '老城街区', title: '中山路街景', caption: '从街区视角感受教堂与城市核心的联系。', type: 'street' },
      { suffix: 'person', year: 1950, periodLabel: '城市记忆', title: '城市影像记忆', caption: '适合连接拍照、取景和城市地标叙事。', type: 'person' },
      { suffix: 'change', year: 1980, periodLabel: '1980年代', title: '建筑保存观察', caption: '用于观察教堂在城市变迁中的保留与展示。', type: 'archive' },
      { suffix: 'today', year: 2025, periodLabel: '今日', title: '今日对比', caption: '和历史图一起观察教堂在当代城市中的存在感。', type: 'today' },
    ]),
    encounterCharacter: {
      name: '老城摄影师',
      role: '城市取景向导',
      avatarType: 'photographer',
      unlockText: '到达圣弥厄尔教堂附近后，可激活老城摄影师偶遇。',
      greeting: '你已经来到圣弥厄尔教堂附近。我是老城摄影师。别急着拍照，先抬头看看双塔、街道和天空的关系，这就是青岛老城最经典的取景框。',
    },
  },
  'qingdao-railway-station': {
    buildingId: 'qingdao-railway-station',
    guideScripts: {
      child: '你可以把火车站想成“进入城市的大门”。很多游客来到青岛，都是先看见车站，再慢慢走向老城和海边。试着观察一下，这栋建筑为什么会让人有“旅程开始了”的感觉。',
      visitor: '青岛火车站老站房很适合当作老城漫游的起点。它连接铁路、港口城市和海边空间，让“抵达青岛”本身变成一段有画面感的经历。对游客来说，从这里出发走向栈桥和中山路，是最自然也最容易建立城市印象的一条线。',
      study: '研学时可以把这里作为“城市门户建筑”来理解：它如何承担集散功能、怎样与海岸线和商业街区发生联系，以及为什么交通建筑也能成为城市记忆中最有情绪的一类空间。',
    },
    oneMinuteStory: '青岛火车站老站房最特别的地方，在于它总和“抵达”这个动作连在一起。对很多人来说，青岛不是先从景点开始，而是先从车站、广场、风和通向海边的那段路开始。作为城市门户，它把交通、港口和老城空间串了起来。对演示平台来说，这里非常适合成为一段时光伴游路线的起点。',
    relatedPeople: [
      { name: '历史讲述人', role: 'AI 伴游角色', description: '把抵达青岛的第一印象讲成一段有场景感的旅程。', avatarType: 'ai' },
    ],
    storyTags: ['交通门户', '铁路', '港口城市', '第一印象'],
    nearbyBuildings: ['st-michael-cathedral', 'post-museum', 'governor-office'],
    routeIds: ['architecture', 'familyStudy'],
    checkinTitle: '青岛火车站老站房实地打卡',
    miniProgramPath: 'pages/building/detail?id=qingdao-railway-station',
    qrImageUrl: 'images/qrcodes/qingdao-railway-station-checkin.png',
    checkinTasks: ['到达现场，激活人物偶遇', '听 1 分钟建筑故事', '完成一个建筑观察问题', '拍照打卡，领取数字徽章'],
    archiveImages: createArchiveImages('qingdao-railway-station', [
      { suffix: 'early', year: 1900, periodLabel: '1900年代初', title: '老站房影像', caption: '用于展示城市门户型建筑的早期形象。', type: 'building' },
      { suffix: 'street', year: 1930, periodLabel: '1920-1930年代', title: '站前街景', caption: '从车站到海边的路径是理解青岛第一印象的重要线索。', type: 'street' },
      { suffix: 'archive', year: 1950, periodLabel: '城市记忆', title: '城市记忆', caption: '记录抵达青岛与进入老城的情绪起点。', type: 'archive' },
      { suffix: 'change', year: 1980, periodLabel: '1980年代', title: '城市变迁中的建筑', caption: '用于观察车站在城市更新中的存在方式。', type: 'archive' },
      { suffix: 'today', year: 2025, periodLabel: '今日', title: '今日外观', caption: '和历史影像一起观察车站在今天的门户感。', type: 'today' },
    ]),
    encounterCharacter: {
      name: '百年旅人',
      role: '城市门户讲述人',
      avatarType: 'traveler',
      unlockText: '到达青岛火车站老站房附近后，可激活百年旅人偶遇。',
      greeting: '欢迎抵达青岛老城。我是百年旅人。很多人的青岛记忆，都是从火车站走向海边的那一刻开始的。现在，我们也从这里出发。',
    },
  },
  'post-museum': {
    buildingId: 'post-museum',
    guideScripts: {
      child: '在没有手机的年代，城市里的消息要怎么走出去呢？来到青岛邮电博物馆，可以把这栋楼想成“帮城市传话的地方”。看看它为什么既像公共建筑，又像连接远方的窗口。',
      visitor: '青岛邮电博物馆适合放慢节奏去看。它记录的不只是信件和通信方式，也让人理解老城曾怎样和外部世界保持联系。对游客来说，这里是一种不那么热闹、但很有城市生活质感的历史体验。',
      study: '这里适合用来观察近代公共服务建筑的功能特征：建筑如何承载城市信息流动，公共服务空间怎样进入商业街区，以及通信系统如何成为现代城市运转的重要基础。',
    },
    oneMinuteStory: '青岛邮电博物馆提醒我们，城市记忆不只有地标和风景，也包括“信息怎样流动”这样的日常系统。曾经的信件、电话和邮政服务，把老城居民和远方世界连在一起，而这类建筑正是这种联系的空间载体。对今天的游客来说，它让现代化这件事不再抽象，而是变成一栋可以走近、可以观察的老建筑。',
    relatedPeople: [
      { name: '历史讲述人', role: 'AI 伴游角色', description: '用更轻松的方式讲清通信、邮政和城市现代化。', avatarType: 'ai' },
    ],
    storyTags: ['邮政通信', '公共服务建筑', '城市现代化', '信息流动'],
    nearbyBuildings: ['st-michael-cathedral', 'qingdao-railway-station', 'governor-office'],
    routeIds: ['familyStudy'],
    checkinTitle: '青岛邮电博物馆实地打卡',
    miniProgramPath: 'pages/building/detail?id=post-museum',
    qrImageUrl: 'images/qrcodes/post-museum-checkin.png',
    checkinTasks: ['到达现场，激活人物偶遇', '听 1 分钟建筑故事', '完成一个建筑观察问题', '拍照打卡，领取数字徽章'],
    archiveImages: createArchiveImages('post-museum', [
      { suffix: 'early', year: 1900, periodLabel: '1900年代初', title: '早期建筑影像', caption: '用于展示近代公共服务建筑的外观特征。', type: 'building' },
      { suffix: 'street', year: 1930, periodLabel: '1920-1930年代', title: '周边街景', caption: '可从街区关系理解邮政通信建筑的公共性。', type: 'street' },
      { suffix: 'archive', year: 1950, periodLabel: '城市记忆', title: '通信记忆', caption: '从信件、电报和城市连接理解这栋建筑。', type: 'archive' },
      { suffix: 'change', year: 1980, periodLabel: '1980年代', title: '城市变迁中的建筑', caption: '用于观察公共建筑在城市更新中的保存状态。', type: 'archive' },
      { suffix: 'today', year: 2025, periodLabel: '今日', title: '今日对比', caption: '便于对照今天的博物馆展示方式与建筑延续。', type: 'today' },
    ]),
    encounterCharacter: {
      name: '邮差先生',
      role: '城市通信讲述人',
      avatarType: 'postman',
      unlockText: '到达青岛邮电博物馆附近后，可激活邮差先生偶遇。',
      greeting: '你来到的是一座关于连接的建筑。我是邮差先生。过去，人们通过信件和电报把青岛与远方联系起来，今天我们用 AI 重新打开这些城市信息。',
    },
  },
  'tsingtao-brewery': {
    buildingId: 'tsingtao-brewery',
    guideScripts: {
      child: '你有没有想过，一座工厂为什么也能变成大家爱逛的地方？青岛啤酒厂旧址就是一个很好的例子。来到这里，我们可以一边认建筑，一边想想工业空间是怎么变成城市故事的一部分的。',
      visitor: '青岛啤酒厂旧址把工业建筑、品牌记忆和游客体验连在了一起。这里适合用来感受青岛不只有海边和红瓦，还有工厂、品牌和城市生活共同组成的另一面。对游客来说，它是很有辨识度的工业遗产演示点。',
      study: '如果作为研学内容，这里适合从工业遗产活化的角度观察：工厂空间如何被重新理解，品牌记忆怎样依附建筑被保留下来，以及工业建筑如何转化为当代文旅体验的一部分。',
    },
    oneMinuteStory: '青岛啤酒厂旧址是一种很有代表性的城市记忆类型。它原本服务于生产，如今却也服务于讲述城市品牌、工业文明和游客体验。正因为如此，它很适合放进一个文旅演示平台里：我们不只是看工厂外观，而是在看一座城市怎样把工业空间重新讲述成文化入口，让老建筑继续参与今天的城市生活。',
    relatedPeople: [
      { name: '历史讲述人', role: 'AI 伴游角色', description: '把工厂、品牌和城市生活讲成一条更容易进入的故事线。', avatarType: 'ai' },
    ],
    storyTags: ['工业遗产', '青岛品牌', '啤酒文化', '工厂博物馆'],
    nearbyBuildings: ['post-museum', 'qingdao-railway-station', 'huashi-building'],
    routeIds: ['familyStudy'],
    checkinTitle: '青岛啤酒厂旧址实地打卡',
    miniProgramPath: 'pages/building/detail?id=tsingtao-brewery',
    qrImageUrl: 'images/qrcodes/tsingtao-brewery-checkin.png',
    checkinTasks: ['到达现场，激活人物偶遇', '听 1 分钟建筑故事', '完成一个建筑观察问题', '拍照打卡，领取数字徽章'],
    archiveImages: createArchiveImages('tsingtao-brewery', [
      { suffix: 'early', year: 1903, periodLabel: '1900年代初', title: '早期厂区影像', caption: '用于展示工业建筑的红砖尺度与生产空间气质。', type: 'building' },
      { suffix: 'street', year: 1930, periodLabel: '1920-1930年代', title: '厂区周边街景', caption: '从街区和厂区关系理解工业遗产的城市位置。', type: 'street' },
      { suffix: 'person', year: 1950, periodLabel: '城市记忆', title: '品牌与人物记忆', caption: '连接青岛品牌、工业记忆和市民生活。', type: 'person' },
      { suffix: 'change', year: 1980, periodLabel: '1980年代', title: '城市变迁中的建筑', caption: '用于观察厂区在城市发展中的保存与转化。', type: 'archive' },
      { suffix: 'today', year: 2025, periodLabel: '今日', title: '今日对比', caption: '适合对照当代文旅转化后的厂区展示状态。', type: 'today' },
    ]),
    encounterCharacter: {
      name: '老厂长',
      role: '工业记忆讲述人',
      avatarType: 'factory',
      unlockText: '到达青岛啤酒厂旧址附近后，可激活老厂长偶遇。',
      greeting: '欢迎来到青岛啤酒厂旧址。我是老厂长。这里不只是生产啤酒的地方，也是一段青岛工业文明和城市品牌记忆的开始。',
    },
  },
  'laoshe-residence': {
    buildingId: 'laoshe-residence',
    guideScripts: {
      child: '你觉得作家住的地方会是什么样子？老舍故居不像大地标那么高大，但很适合用来想象一个人怎么在老城里生活、观察、写作。看看院落、街巷和房子的尺度，也许你会更容易理解文学和城市的关系。',
      visitor: '老舍故居适合在慢慢走的节奏里去感受。这里不强调宏伟，而是让游客从居住建筑、街巷氛围和文学记忆进入青岛的人文一面。来到这里，建筑本身和作家的生活想象会自然叠在一起。',
      study: '这里适合作为“人物与城市关系”的研学样本：观察居住建筑尺度如何塑造生活感，思考文学记忆怎样依附于街区空间，又怎样通过故居被重新讲述给今天的参观者。',
    },
    oneMinuteStory: '老舍故居的魅力，不在于它有多醒目，而在于它让一段文学记忆变得可以被看见。走进这样的居住建筑，人们很容易从房间、院落和周边街巷想象作家的生活节奏。对青岛来说，故居让城市记忆不只是建筑风貌，也包括写作、阅读和人文气质。它让“文学青岛”这件事有了更具体的落点。',
    relatedPeople: [
      { name: '老舍', role: '文学记忆', description: '从作家的居住空间进入青岛的人文街巷和写作想象。', avatarType: 'laoshe' },
    ],
    storyTags: ['文学青岛', '名人故居', '写作记忆', '街区人文'],
    nearbyBuildings: ['kang-youwei-residence', 'jiangsu-road-church', 'governor-residence'],
    routeIds: ['people'],
    checkinTitle: '老舍故居实地打卡',
    miniProgramPath: 'pages/building/detail?id=laoshe-house',
    qrImageUrl: 'images/qrcodes/laoshe-house-checkin.png',
    checkinTasks: ['到达现场，激活人物偶遇', '听 1 分钟建筑故事', '完成一个建筑观察问题', '拍照打卡，领取数字徽章'],
    archiveImages: createArchiveImages('laoshe-house', [
      { suffix: 'early', year: 1930, periodLabel: '1930年代', title: '早期故居影像', caption: '用于展示故居所在街区的历史气质。', type: 'building' },
      { suffix: 'street', year: 1940, periodLabel: '老城街区', title: '文学街区', caption: '从大学路、黄县路一带理解文学青岛。', type: 'street' },
      { suffix: 'person', year: 1950, periodLabel: '人物记忆', title: '人物记忆', caption: '与老舍青岛时期的生活和写作记忆相关。', type: 'person' },
      { suffix: 'change', year: 1980, periodLabel: '1980年代', title: '街区变化', caption: '观察文学街区在城市变化中的连续性。', type: 'archive' },
      { suffix: 'today', year: 2025, periodLabel: '今日', title: '今日对比', caption: '观察名人故居在当代城市中的展示方式。', type: 'today' },
    ]),
    encounterCharacter: {
      name: '文学青岛讲述人',
      role: '文学记忆向导',
      avatarType: 'writer',
      unlockText: '到达老舍故居附近后，可激活文学青岛讲述人偶遇。',
      greeting: '你已经来到老舍故居附近。我是文学青岛讲述人。这里适合慢下来，想一想作家在一座城市里的生活、观察和写作，是怎样变成作品记忆的。',
    },
  },
  'kang-youwei-residence': {
    buildingId: 'kang-youwei-residence',
    guideScripts: {
      child: '这类名人故居看起来可能没有教堂那样显眼，但它更像一个真实生活过的地方。你可以想一想，一个历史人物在这样的房子里会看见什么、走过什么路，这样就更容易把历史和城市联系起来。',
      visitor: '康有为故居适合和周边文化街区一起看。它把近代思想人物、晚年生活和青岛老城空间连接在一起，让游客从建筑进入人物，再从人物回到城市。这样的故居，最适合在步行中慢慢理解。',
      study: '如果用于研学，这里适合观察名人故居与城市街区的关系：居住建筑如何承载人物记忆，街巷氛围怎样帮助理解近代文化节点，以及个人经历如何通过空间被重新讲述。',
    },
    oneMinuteStory: '康有为故居提供了一种和大地标完全不同的城市阅读方式。它不是通过体量取胜，而是通过“这里曾经有人真实生活过”带来历史感。对游客来说，这样的空间很容易把人物、街区和时代联系到一起。对演示平台来说，它也让“时光伴游”不只是看建筑风格，而是能顺着故居走进更细腻的人文记忆。',
    relatedPeople: [
      { name: '康有为', role: '近代思想', description: '从故居空间进入晚年生活与近代思想文化记忆。', avatarType: 'kang' },
    ],
    storyTags: ['近代思想', '名人故居', '文化街区', '晚年寓居'],
    nearbyBuildings: ['laoshe-residence', 'governor-residence', 'jiangsu-road-church'],
    routeIds: ['people'],
    checkinTitle: '康有为故居实地打卡',
    miniProgramPath: 'pages/building/detail?id=kang-youwei-house',
    qrImageUrl: 'images/qrcodes/kang-youwei-house-checkin.png',
    checkinTasks: ['到达现场，激活人物偶遇', '听 1 分钟建筑故事', '完成一个建筑观察问题', '拍照打卡，领取数字徽章'],
    archiveImages: createArchiveImages('kang-youwei-house', [
      { suffix: 'early', year: 1930, periodLabel: '1930年代', title: '早期故居影像', caption: '用于展示故居建筑的早期空间气质。', type: 'building' },
      { suffix: 'street', year: 1940, periodLabel: '老城街区', title: '周边街区', caption: '从福山支路一带理解文化街区和名人故居关系。', type: 'street' },
      { suffix: 'person', year: 1950, periodLabel: '人物记忆', title: '人物记忆', caption: '与近代思想人物晚年生活和城市文化相关。', type: 'person' },
      { suffix: 'change', year: 1980, periodLabel: '1980年代', title: '街区变化', caption: '用于观察名人故居在城市更新中的延续状态。', type: 'archive' },
      { suffix: 'today', year: 2025, periodLabel: '今日', title: '今日对比', caption: '用于观察名人故居在当代城市中的呈现方式。', type: 'today' },
    ]),
    encounterCharacter: {
      name: '近代思想讲述人',
      role: '名人故居向导',
      avatarType: 'thinker',
      unlockText: '到达康有为故居附近后，可激活近代思想讲述人偶遇。',
      greeting: '你已经来到康有为故居附近。我是近代思想讲述人。名人故居不只是旧房子，它保存的是一个人的生活现场，也保存着一段时代的回声。',
    },
  },
  'huashi-building': {
    buildingId: 'huashi-building',
    guideScripts: {
      child: '花石楼最有趣的地方，是它像一栋面朝大海的故事小楼。来到这里，不妨先看看房子，再看看树和路，最后再看看海。你会发现，真正好看的不是单独一栋建筑，而是它和周围风景一起出现的样子。',
      visitor: '花石楼适合用来感受八大关的整体气质。海滨别墅、树影、道路和海风一起出现，让这里很容易形成旅行记忆。对游客来说，这里不仅适合拍照，也适合理解青岛为什么会有“度假城市”的独特气质。',
      study: '这里适合作为八大关建筑风貌的观察点：海滨别墅如何处理观景关系，道路和树木怎样参与空间氛围的形成，以及多元建筑风格如何在同一片区被整体感知。',
    },
    oneMinuteStory: '花石楼很适合提醒人们，建筑体验从来不只是看一栋楼本身。来到八大关，人们记住的往往是海风、树影、道路、院墙和海滨别墅一起构成的氛围，而花石楼正是其中很有代表性的一个节点。对演示平台来说，这里可以帮助观众理解：真正动人的城市风貌，常常来自建筑和周边环境共同完成的整体感。',
    relatedPeople: [
      { name: '历史讲述人', role: 'AI 伴游角色', description: '带你从海滨别墅、树影和道路一起感受八大关。', avatarType: 'ai' },
    ],
    storyTags: ['八大关', '海滨别墅', '多元建筑风格', '海风树影'],
    nearbyBuildings: ['st-michael-cathedral', 'qingdao-railway-station', 'tsingtao-brewery'],
    routeIds: ['familyStudy'],
    checkinTitle: '花石楼实地打卡',
    miniProgramPath: 'pages/building/detail?id=huashi-building',
    qrImageUrl: 'images/qrcodes/huashi-building-checkin.png',
    checkinTasks: ['到达现场，激活人物偶遇', '听 1 分钟建筑故事', '完成一个建筑观察问题', '拍照打卡，领取数字徽章'],
    archiveImages: createArchiveImages('huashi-building', [
      { suffix: 'early', year: 1930, periodLabel: '1930年代', title: '海滨别墅影像', caption: '用于展示海滨别墅与建筑风格的早期状态。', type: 'building' },
      { suffix: 'street', year: 1940, periodLabel: '老城街区', title: '周边街景', caption: '从道路、树木和海岸方向理解八大关风貌。', type: 'street' },
      { suffix: 'archive', year: 1950, periodLabel: '城市记忆', title: '城市记忆', caption: '适合连接海风、别墅和度假城市叙事。', type: 'archive' },
      { suffix: 'change', year: 1980, periodLabel: '1980年代', title: '城市变迁中的建筑', caption: '用于观察八大关风貌在城市变迁中的保留状态。', type: 'archive' },
      { suffix: 'today', year: 2025, periodLabel: '今日', title: '今日对比', caption: '用于观察花石楼与周边风貌在今天的整体感。', type: 'today' },
    ]),
    encounterCharacter: {
      name: '八大关漫游家',
      role: '海滨别墅向导',
      avatarType: 'seaside',
      unlockText: '到达花石楼附近后，可激活八大关漫游家偶遇。',
      greeting: '欢迎来到花石楼。我是八大关漫游家。在这里，不要只看一栋楼，要一起看树影、道路、庭院和海风，它们共同组成了八大关的气质。',
    },
  },
};

export function getHeritageContent(buildingId: string): BuildingHeritageContent | undefined {
  return HERITAGE_CONTENT[buildingId];
}

export function getRouteContent(routeId: RouteId): RouteContent | undefined {
  return ROUTE_CONTENT.find((route) => route.id === routeId);
}
