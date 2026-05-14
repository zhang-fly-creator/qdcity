export type PanoramaMarker = {
  buildingId: string;
  modelId: string;
  index: number;
  label: string;
  category: string;
  position: [number, number, number];
  shortDescription: string;
};

export const PANORAMA_MARKERS: PanoramaMarker[] = [
  {
    buildingId: 'governor-house',
    modelId: 'governor-residence',
    index: 1,
    label: '德国总督楼旧址',
    category: '德式官邸',
    position: [-1.65, 0.28, -0.78],
    shortDescription: '适合从山海关系、红瓦屋顶和老城高差理解青岛气质。',
  },
  {
    buildingId: 'governor-office',
    modelId: 'governor-office',
    index: 2,
    label: '青岛德国总督府旧址',
    category: '行政建筑',
    position: [-1.1, 0.3, -0.52],
    shortDescription: '可以从这里观察老城道路、广场和行政建筑的秩序感。',
  },
  {
    buildingId: 'jiangsu-church',
    modelId: 'jiangsu-road-church',
    index: 3,
    label: '江苏路基督教堂',
    category: '宗教建筑',
    position: [-0.58, 0.28, -0.26],
    shortDescription: '钟楼、坡路和红瓦屋顶共同构成老城方向感。',
  },
  {
    buildingId: 'st-michael-cathedral',
    modelId: 'st-michael-cathedral',
    index: 4,
    label: '圣弥厄尔教堂',
    category: '城市地标',
    position: [0.12, 0.3, -0.18],
    shortDescription: '双塔和街区空间一起形成青岛老城经典天际线。',
  },
  {
    buildingId: 'qingdao-railway-station',
    modelId: 'qingdao-railway-station',
    index: 5,
    label: '青岛火车站老站房',
    category: '交通地标',
    position: [0.72, 0.28, 0.18],
    shortDescription: '从这里进入老城和海边，是理解城市门户的最佳起点。',
  },
  {
    buildingId: 'post-museum',
    modelId: 'post-museum',
    index: 6,
    label: '青岛邮电博物馆',
    category: '邮政建筑',
    position: [0.38, 0.26, 0.02],
    shortDescription: '通信与公共服务建筑让老城和远方世界发生联系。',
  },
  {
    buildingId: 'tsingtao-brewery',
    modelId: 'tsingtao-brewery',
    index: 7,
    label: '青岛啤酒厂旧址',
    category: '工业遗产',
    position: [0.92, 0.34, -0.56],
    shortDescription: '工业遗产、品牌记忆与城市生活在这里交汇。',
  },
  {
    buildingId: 'laoshe-house',
    modelId: 'laoshe-residence',
    index: 8,
    label: '老舍故居',
    category: '名人故居',
    position: [-1.22, 0.24, 0.12],
    shortDescription: '从居住建筑的尺度里进入文学青岛的人文记忆。',
  },
  {
    buildingId: 'kang-youwei-house',
    modelId: 'kang-youwei-residence',
    index: 9,
    label: '康有为故居',
    category: '名人故居',
    position: [-1.48, 0.26, -0.02],
    shortDescription: '适合用来理解名人故居与老城文化街区的关系。',
  },
  {
    buildingId: 'huashi-building',
    modelId: 'huashi-building',
    index: 10,
    label: '花石楼',
    category: '八大关建筑',
    position: [1.18, 0.3, 0.26],
    shortDescription: '海滨别墅、树影、道路和海风共同构成八大关风貌。',
  },
];
