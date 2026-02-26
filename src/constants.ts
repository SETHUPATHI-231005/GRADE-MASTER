export interface RoastCategory {
  id: string;
  range: string;
  title: string;
  emoji: string;
  color: string;
  bgColor: string;
  accentColor: string;
  quotes: string[];
  description: string;
}

export const ROAST_CATEGORIES: RoastCategory[] = [
  {
    id: "topper",
    range: "9.0 – 10.0",
    title: "The Topper Tribe",
    emoji: "🔥",
    color: "text-emerald-900",
    bgColor: "bg-emerald-50",
    accentColor: "bg-emerald-500",
    description: "The ones who make calculators feel insecure.",
    quotes: [
      "Dei un CGPA paatha calculator kuda jealous da 😭",
      "Internal mark venuma? Staff unga peru kekka maataanga 😂",
      "Nee padikara time la na Netflix login panren 😌",
      "Exam ku padikka maaten nu sollitu rank vangura type 😤",
      "Un notes dhaan namma department property",
      "Placement company HR: 'Sir neenga enga office la work pannunga'",
      "Viva la staff ku doubt varum 😂",
      "Nee fail aana news la varum da",
      "College la unofficial HOD 😎",
      "CGPA ku separate locker venum pola 🔥"
    ]
  },
  {
    id: "smart",
    range: "8.0 – 8.9",
    title: "The Smart Batch",
    emoji: "😎",
    color: "text-blue-900",
    bgColor: "bg-blue-50",
    accentColor: "bg-blue-500",
    description: "Safe zone students with a life.",
    quotes: [
      "Dei nee safe zone student da 😂",
      "Padippu irukku… aana over show illa",
      "Last week padichu 8.5 vangura magic",
      "Internal mark unga life insurance 😌",
      "Placement ku tension illa confident smile",
      "Topper friend use panra strategy master",
      "Backlog la touch panna maata",
      "Group study la attendance strong",
      "CGPA solid… effort semi-solid 😂",
      "Neenga dhaan balance batch"
    ]
  },
  {
    id: "survival",
    range: "7.0 – 7.9",
    title: "Survival Kings",
    emoji: "😅",
    color: "text-amber-900",
    bgColor: "bg-amber-50",
    accentColor: "bg-amber-500",
    description: "The 'Pass aana podhum' philosophers.",
    quotes: [
      "Pass aana podhum da nu philosophy",
      "Grace mark unga guardian angel",
      "Exam ku one night war mode",
      "Internal mark illana life dark",
      "Result varaikum tension full",
      "Arrear illa na celebration",
      "Unit 1 dhaan strong area 😂",
      "Attendance manage pannra engineer",
      "Parents: 'seri parava illa' batch",
      "Survival expert certified"
    ]
  },
  {
    id: "border",
    range: "6.0 – 6.9",
    title: "Border Pass Legends",
    emoji: "💀",
    color: "text-orange-900",
    bgColor: "bg-orange-50",
    accentColor: "bg-orange-500",
    description: "Supplementary form permanent residents.",
    quotes: [
      "Hall ticket print panna bayam",
      "Supplementary form permanent resident",
      "Temple visit before result mandatory",
      "Internal mark ku daily follow up",
      "Grace mark vandha treat confirm",
      "Marksheet open panna heart beat increase",
      "Unit 5 skip panra tradition",
      "Placement la motivational speech kekkara level",
      "Backlog count secret ah vechurupom",
      "Improve next sem nu 3 years ah solrom 😭"
    ]
  },
  {
    id: "ultimate",
    range: "Below 6.0",
    title: "Ultimate Legends",
    emoji: "☠️",
    color: "text-rose-900",
    bgColor: "bg-rose-50",
    accentColor: "bg-rose-500",
    description: "Business ideas ready, life set!",
    quotes: [
      "CGPA ah ketta network problem nu solluva",
      "Result day la mobile off mode",
      "Arrear subject oda emotional bonding",
      "Exam hall la subject name doubt",
      "Parents ku 'system error' explanation",
      "Placement la attendance only",
      "Internal mark ku staff kitte friendship",
      "Marksheet open panna suspense movie",
      "Business idea ready ah vechuruka?",
      "College mudichaa podhum da life set 😂"
    ]
  }
];
