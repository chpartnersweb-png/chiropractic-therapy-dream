import { photos } from './images';

export const menuGroups = [
  {
    id: 'basic', number: '01', english: 'Balance & Stretch', title: '基本メニュー',
    heading: ['身体の土台から、', 'バランスを整える。'],
    description: '骨格や筋肉、お顔のバランスに着目。\n一人ひとりの身体に合わせてアプローチします。',
    image: photos.basic, imageAlt: '身体の仕組みについて説明するサロンでの様子',
    imageCaption: '身体のことを知る時間も、大切に。',
    items: [
      { name: 'カイロプラクティック', price: 3500, description: '骨格の歪みに着目し、身体のバランスを整えるケア。' },
      { name: '深層筋ストレッチ', price: 3500, description: 'インナーマッスルにアプローチし、筋肉の柔軟性をサポート。' },
      { name: 'お顔の歪みの調整', price: 2500, description: 'お顔の筋肉をほぐし、左右のバランスを整えるケア。' },
      { name: '眼精疲労', price: 2500, description: '頭のツボを刺激する、目のお疲れが気になる方のためのケア。' },
    ],
  },
  {
    id: 'therapy', number: '02', english: 'Relax & Release', title: 'セラピーメニュー',
    heading: ['こわばりをほどいて、', '深く、ひと息。'],
    description: '足、背中、お腹、そして頭まで。\n気になるところから、ご自身をいたわる時間を。',
    image: photos.therapy, imageAlt: 'カイロセラピードリームの施術風景',
    imageCaption: '手から伝わる、やさしいひととき。',
    items: [
      { name: 'フットリンパ流し', price: 3800, description: '足のリンパに着目し、やさしく流すケア。' },
      { name: '背中のリンパ流し', price: 3500, description: '背中のリンパに着目し、ゆったりとほぐすケア。' },
      { name: 'チネイザン', price: 6000, description: 'お腹を中心に、やさしく深いタッチで身体の深部のこわばりにアプローチ。' },
      { name: 'ヘッドセラピー', price: 2500, description: '頭のツボを刺激し、心身のリフレッシュをサポート。' },
    ],
  },
  {
    id: 'other', number: '03', english: 'Warmth & Well-being', title: 'その他のメニュー',
    heading: ['温める、めぐらせる。', '選べる、身体のケア。'],
    description: '木槌の振動やツボへの刺激、ハーブの温もり。\nさまざまなアプローチから、自分に合うケアを。',
    image: photos.other, imageAlt: '耳周辺のケアを紹介する支給写真',
    imageCaption: '小さなところにも、身体へのいたわりを。',
    items: [
      { name: 'トークセン', price: 3500, description: '木槌を使い、心地よい振動で筋肉にアプローチ。' },
      { name: 'カッピング', price: 3000, description: '専用カップで皮膚をやさしく吸引するケア。' },
      { name: '耳ツボ', price: 2500, description: '耳のツボを刺激し、心身のリフレッシュをサポート。' },
      { name: '手のツボ', price: 3500, description: '手のツボを刺激し、心身のリフレッシュをサポート。' },
      { name: '足ツボ', price: 3500, description: '足のツボを刺激し、心身のリフレッシュをサポート。' },
      { name: 'ハーブ蒸し', price: 5000, description: '12種類のハーブと遠赤外線の温熱で、身体を芯から温めます。' },
    ],
  },
];
