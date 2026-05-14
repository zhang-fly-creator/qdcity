export interface CellModel {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  description: string;
  size: string;
  location: string;
  visibleInLM: string;
  accent: string;
  features: { name: string; detail: string }[];
  funFact: string;
  whereItOccurs: {
    text: string;
    habitat: string;
  };
  modelUrl: string;
  futureModelUrl: string;
  placeholderModelUrl: string;
  modelStatus: 'placeholder' | 'ready';
  imageUrl: string;
  imageStatus: 'placeholder' | 'ready';
  /** Draco-compressed placeholder file size in bytes, used for progress estimation. */
  fileSize: number;
  /** Default Y-axis rotation in radians for a comfortable first view. */
  defaultRotationY: number;
  /** Extra display scale after model normalization. */
  displayScale: number;
}

const BASE = import.meta.env.BASE_URL;
const asset = (p: string) => `${BASE}${p}`.replace(/\/+/g, '/');

const PLACEHOLDER_MODELS = {
  plant: asset('models/placeholders/plant-cell.glb'),
  animal: asset('models/placeholders/animal-cell.glb'),
  white: asset('models/placeholders/white-blood-cell.glb'),
  neuron: asset('models/placeholders/neuron.glb'),
  dna: asset('models/placeholders/dna.glb'),
};

const BUILDING_IMAGE_BASE = 'images/buildings';
const QINGDAO_MODEL_BASE = 'models/qingdao';

type ModelSpec = {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  description: string;
  size: string;
  location: string;
  visibleInLM: string;
  accent: string;
  features: { name: string; detail: string }[];
  funFact: string;
  whereText: string;
  whereHabitat: string;
  imageFile: string;
  futureModelFile: string;
  placeholderModelUrl: string;
  fileSize: number;
  defaultRotationY: number;
  displayScale: number;
};

function createModel(spec: ModelSpec): CellModel {
  const futureModelUrl = asset(`${QINGDAO_MODEL_BASE}/${spec.futureModelFile}`);
  return {
    id: spec.id,
    name: spec.name,
    subtitle: spec.subtitle,
    category: spec.category,
    description: spec.description,
    size: spec.size,
    location: spec.location,
    visibleInLM: spec.visibleInLM,
    accent: spec.accent,
    features: spec.features,
    funFact: spec.funFact,
    whereItOccurs: {
      text: spec.whereText,
      habitat: spec.whereHabitat,
    },
    modelUrl: futureModelUrl,
    futureModelUrl,
    placeholderModelUrl: spec.placeholderModelUrl,
    modelStatus: 'ready',
    imageUrl: asset(`${BUILDING_IMAGE_BASE}/${spec.imageFile}`),
    imageStatus: 'placeholder',
    fileSize: spec.fileSize,
    defaultRotationY: spec.defaultRotationY,
    displayScale: spec.displayScale,
  };
}

export const MODELS: CellModel[] = [
  createModel({
    id: 'st-michael-cathedral',
    name: '圣弥厄尔教堂',
    subtitle: '哥特式风格 · 中山路城市记忆',
    category: '城市地标',
    description:
      '圣弥厄尔教堂是青岛极具辨识度的城市地标之一，双塔形象和周边街区共同构成老城记忆。原始用途为天主教堂。',
    size: '1930 年代',
    location: '青岛市市南区浙江路',
    visibleInLM: '历史建筑 / 城市地标',
    accent: '#b0523d',
    features: [
      { name: '双塔立面具有强烈视觉识别度', detail: '高耸塔身让建筑成为老城天际线中的醒目节点。' },
      { name: '与中山路、浙江路等老城街区关系密切', detail: '宗教建筑与商业街区共同构成游客的老城印象。' },
      { name: '是青岛婚纱摄影和城市漫游的重要点位', detail: '建筑形象已经进入青岛城市影像和旅行记忆。' },
    ],
    funFact: '很多游客对青岛老城的第一印象，并不是某条街，而是教堂尖塔与红瓦屋顶共同构成的天际线。',
    whereText: '适合与中山路、火车站老站房、邮电博物馆组成城市地标路线。',
    whereHabitat: '中山路 · 火车站老站房 · 邮电博物馆',
    imageFile: 'st-michael-cathedral.jpg',
    futureModelFile: 'st-michael-cathedral.glb',
    placeholderModelUrl: PLACEHOLDER_MODELS.neuron,
    fileSize: 87466056,
    defaultRotationY: -Math.PI / 4,
    displayScale: 1.55,
  }),
  createModel({
    id: 'governor-residence',
    name: '德国总督楼旧址',
    subtitle: '德式官邸 · 青岛近代城市记忆',
    category: '德式官邸',
    description:
      '这座建筑是青岛近代城市记忆中的重要地标，承载着德式官邸建筑、山地城市空间与青岛老城风貌的多重信息。原始用途为德国胶澳总督官邸。',
    size: '1903—1907',
    location: '青岛市市南区龙山路一带',
    visibleInLM: '历史建筑 / 城市文化地标',
    accent: '#2f7f8f',
    features: [
      { name: '德式城堡式官邸建筑风格明显', detail: '体量、屋顶和立面共同形成庄重的官邸气质。' },
      { name: '依山势布局，具有强烈的空间层次', detail: '建筑与坡地、视线和入口组织紧密相关。' },
      { name: '红瓦、石墙、坡屋顶构成青岛老城经典视觉', detail: '这些元素共同塑造了青岛老城最具识别度的风貌。' },
    ],
    funFact: '从建筑的高处视角，可以理解青岛老城为什么会形成“山、海、城、楼”交织的独特格局。',
    whereText: '适合与信号山、江苏路基督教堂、德国总督府旧址组成一条老城建筑漫游路线。',
    whereHabitat: '信号山 · 江苏路基督教堂 · 德国总督府旧址',
    imageFile: 'governor-house.jpg',
    futureModelFile: 'governor-house.glb',
    placeholderModelUrl: PLACEHOLDER_MODELS.plant,
    fileSize: 87466056,
    defaultRotationY: -Math.PI / 5,
    displayScale: 1.35,
  }),
  createModel({
    id: 'governor-office',
    name: '青岛德国总督府旧址',
    subtitle: '近代行政建筑 · 城市治理记忆',
    category: '行政建筑',
    description:
      '这座建筑见证了青岛近代城市治理体系和城市规划的形成，是理解青岛老城行政空间的重要入口。原始用途为德国胶澳行政办公建筑。',
    size: '1900 年代',
    location: '青岛市市南区老城片区',
    visibleInLM: '历史建筑 / 城市记忆节点',
    accent: '#8f3f2f',
    features: [
      { name: '建筑形态庄重，体现近代行政建筑气质', detail: '稳定的比例和公共尺度传达行政空间的秩序感。' },
      { name: '与周边道路、广场和山地空间关系密切', detail: '建筑不是孤立对象，而是老城空间组织的一部分。' },
      { name: '是青岛近代城市格局的重要组成部分', detail: '它帮助理解早期城市治理和街区规划的形成。' },
    ],
    funFact: '看这类行政建筑，不只是看外观，更是在看一座城市早期秩序如何被设计出来。',
    whereText: '适合与德国总督楼旧址、江苏路基督教堂、老舍故居联动讲解。',
    whereHabitat: '德国总督楼旧址 · 江苏路基督教堂 · 老舍故居',
    imageFile: 'governor-office.jpg',
    futureModelFile: 'governor-office.glb',
    placeholderModelUrl: PLACEHOLDER_MODELS.animal,
    fileSize: 87466056,
    defaultRotationY: -Math.PI / 4,
    displayScale: 1.35,
  }),
  createModel({
    id: 'jiangsu-road-church',
    name: '江苏路基督教堂',
    subtitle: '钟楼与红瓦 · 老城精神地标',
    category: '宗教建筑',
    description:
      '江苏路基督教堂以红瓦屋顶、钟楼和老城街巷关系成为青岛历史城区的重要视觉符号。原始用途为基督教堂。',
    size: '1910 年代',
    location: '青岛市市南区江苏路',
    visibleInLM: '历史建筑 / 宗教文化地标',
    accent: '#1f6f8b',
    features: [
      { name: '钟楼轮廓突出，适合作为老城识别点', detail: '竖向轮廓在坡地街巷中形成清晰方向感。' },
      { name: '建筑与周边坡路、街巷关系紧密', detail: '步行接近过程本身就是老城体验的一部分。' },
      { name: '具有鲜明的德式宗教建筑风格', detail: '红瓦屋顶和钟楼形象延续了青岛老城建筑风貌。' },
    ],
    funFact: '在青岛老城漫步时，钟楼经常像一个方向标，帮助游客判断自己在老城区中的位置。',
    whereText: '适合加入老城徒步路线、建筑摄影路线和亲子研学路线。',
    whereHabitat: '老城徒步 · 建筑摄影 · 亲子研学',
    imageFile: 'jiangsu-church.jpg',
    futureModelFile: 'jiangsu-church.glb',
    placeholderModelUrl: PLACEHOLDER_MODELS.white,
    fileSize: 87466056,
    defaultRotationY: -Math.PI / 6,
    displayScale: 1.45,
  }),
  createModel({
    id: 'qingdao-railway-station',
    name: '青岛火车站老站房',
    subtitle: '城市门户 · 百年交通记忆',
    category: '交通地标',
    description:
      '青岛火车站老站房是城市门户型建筑，连接了铁路交通、港口城市和青岛近代城市发展的记忆。原始用途为铁路车站。',
    size: '1900 年代',
    location: '青岛市市南区泰安路',
    visibleInLM: '历史建筑 / 城市交通地标',
    accent: '#d3a447',
    features: [
      { name: '具有鲜明的老站房建筑形象', detail: '站房轮廓与交通功能共同形成强烈的抵达感。' },
      { name: '是游客进入青岛老城的重要第一站', detail: '从这里出发，很容易进入栈桥、中山路和老城片区。' },
      { name: '与海岸线、中山路和老城区联系紧密', detail: '交通门户、海滨空间和商业街区在步行尺度内相互连接。' },
    ],
    funFact: '对很多人来说，青岛的城市记忆是从火车站走向海边的那一刻开始的。',
    whereText: '适合作为青岛老城漫游路线的起点。',
    whereHabitat: '泰安路 · 栈桥方向 · 中山路片区',
    imageFile: 'qingdao-railway-station.jpg',
    futureModelFile: 'qingdao-railway-station.glb',
    placeholderModelUrl: PLACEHOLDER_MODELS.dna,
    fileSize: 50708336,
    defaultRotationY: 0,
    displayScale: 1.25,
  }),
  createModel({
    id: 'post-museum',
    name: '青岛邮电博物馆',
    subtitle: '胶澳邮政 · 城市通信记忆',
    category: '邮政建筑',
    description:
      '青岛邮电博物馆承载着近代邮政、通信和城市信息流动的历史，是理解青岛现代城市功能的重要建筑。原始用途为邮政通信建筑。',
    size: '1900 年代',
    location: '青岛市市南区安徽路一带',
    visibleInLM: '历史建筑 / 博物馆空间',
    accent: '#2f8f74',
    features: [
      { name: '体现近代公共服务建筑特征', detail: '对外服务、后台处理和机构办公功能在建筑中并置。' },
      { name: '与青岛老城商业街区关系密切', detail: '邮政通信建筑服务于城市商业和居民日常。' },
      { name: '适合讲述通信、邮政和城市现代化故事', detail: '它让抽象的信息流动变成可参观的城市空间。' },
    ],
    funFact: '邮政建筑记录的不只是信件传递，也记录了城市如何与外部世界发生联系。',
    whereText: '适合与中山路、圣弥厄尔教堂、青岛火车站老站房组合成老城公共建筑路线。',
    whereHabitat: '中山路 · 圣弥厄尔教堂 · 青岛火车站老站房',
    imageFile: 'post-museum.jpg',
    futureModelFile: 'post-museum.glb',
    placeholderModelUrl: PLACEHOLDER_MODELS.plant,
    fileSize: 50708336,
    defaultRotationY: -Math.PI / 4,
    displayScale: 1.3,
  }),
  createModel({
    id: 'tsingtao-brewery',
    name: '青岛啤酒厂旧址',
    subtitle: '工业文明 · 青岛品牌记忆',
    category: '工业遗产',
    description:
      '青岛啤酒厂旧址是青岛工业文明和城市品牌记忆的重要载体，也是工业遗产转化为文旅体验的代表。原始用途为啤酒生产工厂。',
    size: '1903 年',
    location: '青岛市市北区登州路',
    visibleInLM: '工业遗产 / 博物馆与品牌地标',
    accent: '#6f7f3a',
    features: [
      { name: '红砖工业建筑特征鲜明', detail: '材料和尺度体现近代工业建筑的效率与耐久。' },
      { name: '连接工业生产、城市品牌和游客体验', detail: '从生产空间转化为品牌文化和文旅空间。' },
      { name: '是青岛工业遗产活化的重要样本', detail: '展示工业遗产如何进入当代城市生活。' },
    ],
    funFact: '一座工厂能够成为城市名片，说明工业建筑也可以变成文化传播的入口。',
    whereText: '适合与青岛工业遗产、品牌文化、研学体验路线结合。',
    whereHabitat: '登州路 · 工业遗产 · 品牌文化',
    imageFile: 'tsingtao-brewery.jpg',
    futureModelFile: 'tsingtao-brewery.glb',
    placeholderModelUrl: PLACEHOLDER_MODELS.animal,
    fileSize: 50708336,
    defaultRotationY: -Math.PI / 5,
    displayScale: 1.35,
  }),
  createModel({
    id: 'laoshe-residence',
    name: '老舍故居',
    subtitle: '文学青岛 · 骆驼祥子记忆',
    category: '名人故居',
    description:
      '老舍故居连接着青岛的文学记忆，也让老建筑从空间遗产进一步变成可讲述的人文故事。原始用途为居住建筑。',
    size: '近代历史建筑',
    location: '青岛市市南区黄县路一带',
    visibleInLM: '名人故居 / 文学记忆空间',
    accent: '#5f4a3d',
    features: [
      { name: '建筑尺度亲切，适合人物故事讲解', detail: '故居空间更接近日常生活，便于连接人物和情境。' },
      { name: '与大学路、黄县路一带文化氛围联系紧密', detail: '街区气质让文学记忆有了可步行的空间背景。' },
      { name: '适合开展文学主题研学', detail: '可从建筑进入作家、作品和时代心境的讲述。' },
    ],
    funFact: '名人故居的价值不只在建筑本身，更在于它曾经承载的写作、生活和时代心境。',
    whereText: '适合与康有为故居、沈从文相关旧居、大学路片区组成文学青岛路线。',
    whereHabitat: '康有为故居 · 大学路片区 · 文学青岛',
    imageFile: 'laoshe-house.jpg',
    futureModelFile: 'laoshe-house.glb',
    placeholderModelUrl: PLACEHOLDER_MODELS.white,
    fileSize: 50708336,
    defaultRotationY: -Math.PI / 3,
    displayScale: 1.4,
  }),
  createModel({
    id: 'kang-youwei-residence',
    name: '康有为故居',
    subtitle: '晚年寓居 · 近代思想记忆',
    category: '名人故居',
    description:
      '康有为故居是青岛名人故居体系中的重要一处，连接着近代思想人物、晚年生活和青岛城市文化。原始用途为居住建筑。',
    size: '近代历史建筑',
    location: '青岛市市南区福山支路一带',
    visibleInLM: '名人故居 / 近代思想文化节点',
    accent: '#7f5732',
    features: [
      { name: '具有典型老城居住建筑气质', detail: '尺度、院落和街巷关系共同呈现青岛老城生活场景。' },
      { name: '适合讲述人物晚年生活和思想影响', detail: '建筑为近代人物故事提供了具体空间。' },
      { name: '与周边文化街区可形成步行游线', detail: '可串联大学路、信号山和其他名人故居。' },
    ],
    funFact: '看名人故居时，可以把建筑理解成一个人的生活现场，而不是一块静态牌匾。',
    whereText: '适合与老舍故居、大学路文化片区、信号山片区联动讲解。',
    whereHabitat: '老舍故居 · 大学路文化片区 · 信号山片区',
    imageFile: 'kang-youwei-house.jpg',
    futureModelFile: 'kang-youwei-house.glb',
    placeholderModelUrl: PLACEHOLDER_MODELS.neuron,
    fileSize: 87466056,
    defaultRotationY: -Math.PI / 4,
    displayScale: 1.5,
  }),
  createModel({
    id: 'huashi-building',
    name: '花石楼',
    subtitle: '海滨别墅 · 八大关风貌记忆',
    category: '八大关建筑',
    description:
      '花石楼是八大关区域的代表性建筑之一，体现了青岛海滨别墅、庭院空间和多元建筑风格的融合。原始用途为海滨别墅。',
    size: '1930 年代',
    location: '青岛市市南区八大关片区',
    visibleInLM: '历史建筑 / 八大关代表性建筑',
    accent: '#b85f4d',
    features: [
      { name: '海滨别墅形象鲜明', detail: '建筑体量、材料和观景关系共同强化度假气质。' },
      { name: '与八大关道路、庭院和海岸风景关系紧密', detail: '建筑体验来自街路、树木、院落和海风的组合。' },
      { name: '适合展示青岛度假城市和万国建筑风貌', detail: '花石楼是理解八大关多元风格的重要入口。' },
    ],
    funFact: '八大关最迷人的地方，不是单栋建筑，而是建筑、树木、道路和海风共同形成的整体氛围。',
    whereText: '适合做八大关建筑漫游、摄影打卡和亲子研学路线。',
    whereHabitat: '八大关建筑漫游 · 摄影打卡 · 亲子研学',
    imageFile: 'huashi-building.jpg',
    futureModelFile: 'huashi-building.glb',
    placeholderModelUrl: PLACEHOLDER_MODELS.dna,
    fileSize: 50708336,
    defaultRotationY: -Math.PI / 6,
    displayScale: 1.25,
  }),
];

export const DEFAULT_MODEL_ID = MODELS[0].id;
