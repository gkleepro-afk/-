import { Achievement, UserStats } from '../types';

export const SYSTEM_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-streak-3',
    title: '持之以恒 · 星火初燃',
    titleEn: '3-Day Streak: Flame Pioneer',
    description: '连续完成 3 天学习打卡，自律习惯正在生根发芽！',
    descriptionEn: 'Maintained a 3-day continuous study streak. Building great habits!',
    icon: '🔥',
    category: 'streak',
    milestoneType: 'streak_3',
    requiredValue: 3,
    rewardExp: 100,
    rewardTitle: '自律新星',
    rewardTitleEn: 'Discipline Novice',
    unlocked: false,
  },
  {
    id: 'ach-streak-7',
    title: '习惯养成 · 破浪前行',
    titleEn: '7-Day Streak: Habit Champion',
    description: '连续完成 7 天学习打卡，跨越一周周期，迈入深度自律！',
    descriptionEn: 'Maintained a 7-day continuous study streak across an entire week!',
    icon: '⚡',
    category: 'streak',
    milestoneType: 'streak_7',
    requiredValue: 7,
    rewardExp: 300,
    rewardTitle: '习惯大师',
    rewardTitleEn: 'Habit Master',
    unlocked: false,
  },
  {
    id: 'ach-streak-14',
    title: '钢铁毅力 · 学霸加冕',
    titleEn: '14-Day Streak: Perseverance Legend',
    description: '连续完成 14 天两周无断连打卡，坚韧不拔，所向披靡！',
    descriptionEn: 'Maintained a 14-day study streak for 2 full consecutive weeks!',
    icon: '👑',
    category: 'streak',
    milestoneType: 'streak_14',
    requiredValue: 14,
    rewardExp: 600,
    rewardTitle: '毅力王者',
    rewardTitleEn: 'Perseverance King',
    unlocked: false,
  },
  {
    id: 'ach-streak-30',
    title: '月度传奇 · 自律巅峰',
    titleEn: '30-Day Streak: Month Titan',
    description: '连续完成 30 天整月打卡，成为学习领域的绝对王者！',
    descriptionEn: 'Achieved a 30-day streak for an entire month of dedication!',
    icon: '🏆',
    category: 'streak',
    milestoneType: 'streak_30',
    requiredValue: 30,
    rewardExp: 1500,
    rewardTitle: '不败传奇',
    rewardTitleEn: 'Undefeated Titan',
    unlocked: false,
  },
  {
    id: 'ach-tasks-10',
    title: '任务达人 · 行动力满格',
    titleEn: 'Task Pro: 10 Tasks Done',
    description: '累计完成 10 个学习任务，稳扎稳打！',
    descriptionEn: 'Completed 10 study tasks on your roadmap.',
    icon: '🎯',
    category: 'learning',
    milestoneType: 'tasks_10',
    requiredValue: 10,
    rewardExp: 150,
    rewardTitle: '行动先锋',
    rewardTitleEn: 'Action Pioneer',
    unlocked: false,
  },
  {
    id: 'ach-cards-50',
    title: '博闻强记 · 记忆大师',
    titleEn: 'Memory Master: 50 Cards',
    description: '累计复习掌握 50 张艾宾浩斯智能闪卡。',
    descriptionEn: 'Reviewed and mastered 50 flashcards with spaced repetition.',
    icon: '🧠',
    category: 'mastery',
    milestoneType: 'cards_50',
    requiredValue: 50,
    rewardExp: 200,
    rewardTitle: '超级记忆体',
    rewardTitleEn: 'Super Memory',
    unlocked: false,
  },
  {
    id: 'ach-exam-passed',
    title: '考场初捷 · 金榜题名',
    titleEn: 'Exam Ace: First Test Passed',
    description: '在仿真考场中顺利完成并及格一张全真试卷。',
    descriptionEn: 'Completed and passed a mock exam paper in the exam center.',
    icon: '📜',
    category: 'exam',
    milestoneType: 'exam_passed',
    requiredValue: 1,
    rewardExp: 250,
    rewardTitle: '考场尖兵',
    rewardTitleEn: 'Exam Ace',
    unlocked: false,
  }
];

export const getAchievementsWithProgress = (stats: UserStats): (Achievement & { progress: number; progressMax: number })[] => {
  const unlockedIds = new Set(stats.unlockedAchievements || []);
  const claimedIds = new Set(stats.claimedAchievements || []);

  return SYSTEM_ACHIEVEMENTS.map(ach => {
    let progress = 0;
    let progressMax = ach.requiredValue;
    let isUnlocked = unlockedIds.has(ach.id);

    switch (ach.milestoneType) {
      case 'streak_3':
      case 'streak_7':
      case 'streak_14':
      case 'streak_30':
        progress = stats.streakDays || 0;
        if (progress >= ach.requiredValue) isUnlocked = true;
        break;
      case 'tasks_10':
        progress = stats.completedTasksCount || 0;
        if (progress >= ach.requiredValue) isUnlocked = true;
        break;
      case 'cards_50':
        progress = stats.reviewedCardsCount || 0;
        if (progress >= ach.requiredValue) isUnlocked = true;
        break;
      case 'exam_passed':
        progress = stats.quizzesTakenCount || 0;
        if (progress >= ach.requiredValue) isUnlocked = true;
        break;
    }

    return {
      ...ach,
      progress: Math.min(progress, progressMax),
      progressMax,
      unlocked: isUnlocked,
      claimed: claimedIds.has(ach.id),
    };
  });
};
