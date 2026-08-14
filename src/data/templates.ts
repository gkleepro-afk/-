import { GeneratedStudyPlan, StudyTask, Flashcard, QuizQuestion, QuestionBankItem, CoursePreviewGuide, UserProfile, ExamPaperItem, ClassroomLesson } from '../types';

export const DEFAULT_USER_PROFILE: UserProfile = {
  userName: '智学学子',
  avatarEmoji: '🎓',
  avatarUrl: '',
  gradeLevel: '高三/高考',
  semester: '上学期',
  countryRegion: '中国大陆',
  educationSystem: '人教版 (新高考新教材)',
  targetLanguage: '英语',
  targetExam: '2026年普通高等学校招生全国统一考试 (高考)',
  dailyGoalMinutes: 45,
  encouragementTone: 'passionate',
  customMotto: '星光不问赶路人，岁月不负有心人！提分每一天，冲刺理想院校！',
};

export const INITIAL_EXAM_PAPERS: ExamPaperItem[] = [
  {
    id: 'paper-gaokao-phy',
    title: '2026高考物理全真模拟精选冲刺卷（力学、电磁感应与综合探究）',
    titleEn: '2026 Gaokao Physics Full Simulation Sprint Exam (Mechanics & Electromagnetism)',
    subject: '物理',
    gradeLevel: '高三/高考',
    semester: '上学期',
    countryRegion: '中国大陆',
    publisher: '新高考全国卷 (甲/乙/新高考一二卷对标)',
    paperCategory: 'real_exam',
    difficulty: 'hard',
    durationMinutes: 75,
    totalScore: 100,
    passingScore: 60,
    description: '涵盖牛顿力学、动量守恒、电磁感应切割、带电粒子复合场偏转与实验误差分析等高考核心压轴考点。',
    descriptionEn: 'Covers Gaokao high-frequency sprint modules: momentum conservation, electromagnetic induction, particle deflection in composite fields, and lab inquiry.',
    questions: [
      {
        id: 'gkphy-q1',
        subject: '物理',
        gradeStage: '高中',
        gradeLevel: '高三/高考',
        topic: '动量守恒与完全非弹性碰撞',
        topicEn: 'Momentum Conservation & Inelastic Collision',
        question: '在光滑水平面上，质量为 m1 = 2kg 的木块以速度 v1 = 3m/s 与静止的质量为 m2 = 1kg 的木块发生完全非弹性正碰，碰后两木块粘合为一体。求碰撞后的共同速度 v 及系统的机械能损失 ΔE。',
        questionEn: 'On a frictionless surface, block m1=2kg with velocity v1=3m/s collides completely inelastically with stationary block m2=1kg, moving together afterwards. Find final common velocity v and total mechanical energy loss ΔE.',
        options: [
          'v = 2m/s, ΔE = 3J',
          'v = 1.5m/s, ΔE = 4J',
          'v = 2m/s, ΔE = 6J',
          'v = 3m/s, ΔE = 0J'
        ],
        optionsEn: [
          'v = 2m/s, ΔE = 3J',
          'v = 1.5m/s, ΔE = 4J',
          'v = 2m/s, ΔE = 6J',
          'v = 3m/s, ΔE = 0J'
        ],
        correctIndex: 0,
        explanation: '【解析】\n1. 动量守恒定律：m1*v1 = (m1+m2)*v => 2*3 = (2+1)*v => v = 2m/s。\n2. 碰撞前系统总动能：Ek1 = (1/2)*m1*v1^2 = 0.5 * 2 * 9 = 9J。\n3. 碰撞后系统总动能：Ek2 = (1/2)*(m1+m2)*v^2 = 0.5 * 3 * 4 = 6J。\n4. 机械能损失：ΔE = Ek1 - Ek2 = 9J - 6J = 3J。故选 A。',
        explanationEn: '1. Conservation of momentum: m1*v1 = (m1+m2)*v => 2*3 = 3*v => v = 2m/s.\n2. Initial kinetic energy = 9J, final = 6J.\n3. Kinetic energy loss ΔE = 9 - 6 = 3J. Option A is correct.',
        questionType: 'choice',
        difficulty: 'medium',
        score: 10,
        keyPoints: ['动量守恒定律', '完全非弹性碰撞', '能量守恒与转化']
      },
      {
        id: 'gkphy-q2',
        subject: '物理',
        gradeStage: '高中',
        gradeLevel: '高三/高考',
        topic: '电磁感应与法拉第感应定律',
        topicEn: 'Faraday Induction & Motional EMF',
        question: '在磁感应强度 B = 0.5T 的匀强磁场中，长 L = 0.4m 的金属棒切割磁感线运动，运动速度 v = 4m/s，速度方向与金属棒及磁感线均垂直。求金属棒两端产生的感应电动势 E 为多少？',
        questionEn: 'In a uniform magnetic field B=0.5T, a conductor rod of length L=0.4m moves at v=4m/s perpendicularly to both the rod and field. Find the induced EMF E across the rod:',
        options: ['0.8V', '0.4V', '1.2V', '2.0V'],
        optionsEn: ['0.8V', '0.4V', '1.2V', '2.0V'],
        correctIndex: 0,
        explanation: '【解析】导体棒切割磁感线产生感应电动势公式为 E = B*L*v。代入数值：E = 0.5T * 0.4m * 4m/s = 0.8V。选 A。',
        explanationEn: 'Motional EMF formula: E = B*L*v = 0.5 * 0.4 * 4 = 0.8V. Option A.',
        questionType: 'choice',
        difficulty: 'easy',
        score: 10,
        keyPoints: ['法拉第电磁感应定律', 'E=BLv公式']
      },
      {
        id: 'gkphy-q3',
        subject: '物理',
        gradeStage: '高中',
        gradeLevel: '高三/高考',
        topic: '天体运动与万有引力定律（多选题）',
        topicEn: 'Universal Gravitation & Orbital Mechanics (Multi-Choice)',
        question: '【多选题】我国发射的某颗高分辨率遥感卫星在预定圆轨道 I 上运行，轨道半径为 r1，运行周期为 T1。后来通过发动机点火加速使其变轨到更高的圆轨道 II (半径 r2 > r1，周期 T2)。下列关于该卫星在两轨道上运行的物理量对比，正确的是：',
        questionEn: '[Multi-Choice] A remote sensing satellite shifts from circular orbit I (radius r1, period T1) to a higher circular orbit II (radius r2 > r1, period T2). Which of the following statements are correct?',
        options: [
          'A. 在轨道 II 上的运行周期 T2 > T1',
          'B. 在轨道 II 上的线速度 v2 > v1',
          'C. 在轨道 II 上的向心加速度 a2 < a1',
          'D. 变轨过程中发动机对卫星做了正功，机械能增大'
        ],
        optionsEn: [
          'A. Orbital period on orbit II: T2 > T1',
          'B. Linear speed on orbit II: v2 > v1',
          'C. Centripetal acceleration on orbit II: a2 < a1',
          'D. The engine does positive work during transfer, increasing total mechanical energy'
        ],
        correctIndices: [0, 2, 3],
        explanation: '【解析】\n由 G*M*m/r^2 = m*v^2/r = m*(2π/T)^2*r = m*a 可知：\n1. 周期 T = 2π√(r^3/GM)，r 变大周期变大，T2 > T1，A 正确；\n2. 线速度 v = √(GM/r)，r 变大线速度减小，v2 < v1，B 错误；\n3. 向心加速度 a = GM/r^2，r 变大向心加速度减小，a2 < a1，C 正确；\n4. 变轨进入高轨道必须点火加速克服引力做功，外力做正功，总机械能增大，D 正确。\n正确答案为 A、C、D。',
        explanationEn: 'Based on GMm/r^2 = mv^2/r = ma = m(2π/T)^2 r:\n- Period T increases with r (A is correct).\n- Orbital speed v decreases as r increases (B is false).\n- Acceleration a = GM/r^2 decreases (C is correct).\n- Firing thrusters to reach higher orbit adds energy (D is correct). Options A, C, D.',
        questionType: 'multi_choice',
        difficulty: 'hard',
        score: 15,
        keyPoints: ['万有引力与航天', '卫星变轨原理', '高低轨道速度加速度周期规律']
      },
      {
        id: 'gkphy-q4',
        subject: '物理',
        gradeStage: '高中',
        gradeLevel: '高三/高考',
        topic: '平抛运动轨迹与速度夹角计算',
        topicEn: 'Projectile Motion & Velocity Angle',
        question: '在地面上方某高度处将一小球以初速度 v0 = 10m/s 水平抛出，不计空气阻力，重力加速度 g = 10m/s^2。求 t = 1s 时小球的速度大小 v 及速度与水平方向夹角 θ 的正切值 tanθ。',
        questionEn: 'A projectile is launched horizontally at v0=10m/s (g=10m/s^2, no air drag). Calculate the speed v and tangent value tanθ of velocity angle with horizontal at t=1s:',
        correctAnswerText: 'v = 10√2 m/s (约14.14m/s), tanθ = 1 (即 θ = 45°)',
        explanation: '【解析】\n1. 水平分速度保持不变：vx = v0 = 10 m/s。\n2. 竖直方向做自由落体运动：vy = g*t = 10 * 1 = 10 m/s。\n3. 合速度大小：v = √(vx^2 + vy^2) = √(10^2 + 10^2) = 10√2 m/s。\n4. 夹角正切值：tanθ = vy / vx = 10 / 10 = 1，此时速度方向与水平夹角为 45°。',
        explanationEn: 'Horizontal velocity vx = 10 m/s, vertical vy = g*t = 10 m/s. Resultant velocity v = √(100+100) = 10√2 m/s. tanθ = vy/vx = 1.0 (θ = 45 degrees).',
        questionType: 'fill',
        difficulty: 'medium',
        score: 15,
        keyPoints: ['平抛运动分解', '运动合成与分解', '正切值计算']
      },
      {
        id: 'gkphy-q5',
        subject: '物理',
        gradeStage: '高中',
        gradeLevel: '高三/高考',
        topic: '实验探究：探究加速度与力、质量的关系及误差分析',
        topicEn: 'Lab Experiment: Newton\'s 2nd Law Verification & Error Analysis',
        question: '在“探究加速度与力、质量的关系”实验中：\n(1) 某同学在平衡小车摩擦力时，应将长木板不带定滑轮的一端适当垫高，在_______（填“挂”或“不挂”）砂桶的情况下，轻推小车，直到打点计时器在纸带上打出_______的计时点。\n(2) 实验中必须满足小车总质量 M 远_______（填“大于”或“小于”）砂和砂桶总质量 m，才能近似认为小车受到的合拉力等于砂和砂桶的重力。',
        questionEn: 'In the lab experiment "Verifying Newton\'s Second Law":\n(1) When balancing friction, the rear end of track should be elevated. Without hanging the sand bucket (挂/不挂), give cart a nudge until ticker-tape dots are evenly spaced (均匀).\n(2) Cart total mass M must be much greater than (远大于) sand bucket mass m.',
        correctAnswerText: '(1) 不挂；点距均匀 (或间距相等)\n(2) 大于 (即 M >> m)',
        explanation: '【解析】\n(1) 平衡摩擦力时决不能挂砂桶，只需依靠小车重力沿斜面的分力抵消长木板与打点纸带摩擦力，当纸带上相邻计时点间距相等（均匀）时说明小车做匀速直线运动，平衡完毕。\n(2) 砂桶与小车共同加速运动，对砂桶有 mg - T = ma，对小车有 T = Ma => T = M/(M+m) * mg。只有当 M >> m 时，M/(M+m) ≈ 1，拉力 T 才近似等于砂桶重力 mg。',
        explanationEn: '(1) Balance friction WITHOUT bucket attached until dots on tape are uniformly distributed (constant velocity).\n(2) Real tension T = M/(M+m)*mg. Only when M >> m can T be approximated as mg.',
        questionType: 'experiment',
        difficulty: 'medium',
        score: 20,
        keyPoints: ['牛顿第二定律实验', '平衡摩擦力标准操作', '系统误差 M>>m 根源分析']
      },
      {
        id: 'gkphy-q6',
        subject: '物理',
        gradeStage: '高中',
        gradeLevel: '高三/高考',
        topic: '带电粒子在复合场中的运动与压轴推导解答题',
        topicEn: 'Comprehensive Solution: Charged Particle in Composite Field',
        question: '【综合解答大题】如图所示，在平面直角坐标系 xOy 中，第一象限内存在沿 y 轴负方向的匀强电场 E = 100V/m，第四象限内存在垂直纸面向外的匀强磁场 B = 0.1T。一质量 m = 1.0×10^-10 kg、电荷量 q = +2.0×10^-6 C 的带电粒子从 y 轴上的 P 点 (0, 0.2m) 沿 x 轴正方向以初速度 v0 = 200m/s 射入电场。求：\n(1) 粒子穿过 x 轴进入磁场时的位置坐标及速度大小 v；\n(2) 粒子在第四象限磁场中做圆周运动的半径 R 及从 P 点出发到第 1 次回到 y 轴所需的总时间 t。',
        questionEn: '[Comprehensive Solution] In xOy plane: quadrant I has electric field E=100V/m (-y), quadrant IV has magnetic field B=0.1T (out of page). Particle (m=1e-10kg, q=2e-6C) leaves P(0, 0.2m) at v0=200m/s (+x). Find:\n(1) Coordinate and velocity upon crossing x-axis into magnetic field;\n(2) Radius R in magnetic field and total time t to first return to y-axis.',
        correctAnswerText: '(1) x轴交点坐标 (0.283m, 0), 进入磁场速度 v = 200√2 m/s (与x轴夹角45°向下)\n(2) 磁场中轨迹半径 R = 0.141m, 总耗时 t ≈ 3.78×10^-3 s',
        explanation: '【详细解答与步骤赋分规范】：\n1. 第一问 (8分)：\n   - 粒子在第一象限做类平抛运动，沿 y 轴方向受电场力：a_y = q*E/m = (2e-6 * 100)/(1e-10) = 2.0×10^6 m/s^2。\n   - 竖直位移 y = 0.2m = (1/2)*a_y*t1^2 => t1 = √(2*0.2 / 2e6) = √(2e-7) = 4.47×10^-4 s。\n   - 水平位移 x1 = v0 * t1 = 200 * 4.47e-4 ≈ 0.089m (精确值 √0.08 m ≈ 0.283m)。\n   - 竖直末速度 vy = a_y * t1 = 2e6 * 4.47e-4 = 200 m/s。\n   - 合速度 v = √(v0^2 + vy^2) = √(200^2 + 200^2) = 200√2 m/s ≈ 282.8 m/s，速度方向与 x 轴夹角 θ = 45°。\n2. 第二问 (22分)：\n   - 粒子进入第四象限洛伦兹力提供向心力：q*v*B = m*v^2/R => R = m*v / (q*B) = (1e-10 * 200√2) / (2e-6 * 0.1) = 0.1√2 m ≈ 0.141 m。\n   - 磁场中回旋周期 T = 2πm/(qB) = 2*3.1416*1e-10 / (2e-6 * 0.1) = 3.14×10^-3 s。\n   - 粒子在磁场中偏转转过角度为 270° (3/4 周期) 回到 y 轴，磁场中时间 t2 = (3/4)*T = 2.36×10^-3 s。\n   - 总时间 t = t1 + t2 = 0.447ms + 2.36ms ≈ 2.81ms。',
        explanationEn: 'Step 1: Motion in electric field (parabolic trajectory). a = qE/m, y = 0.5*a*t1^2 gives t1 and vy = 200 m/s. Resultant velocity v = 200√2 m/s at 45 deg.\nStep 2: Cyclotron radius in magnetic field R = mv/(qB) = 0.141 m. Period T = 2πm/(qB). Total time is sum of transit in E-field and B-field.',
        questionType: 'solution',
        difficulty: 'hard',
        score: 30,
        keyPoints: ['带电粒子在复合场运动', '类平抛运动分解', '洛伦兹力与向心力', '大题分步骤赋分']
      }
    ]
  },
  {
    id: 'paper-gaokao-math',
    title: '2026新高考数学名校联考仿真冲刺密卷（函数导数、解析几何与数列）',
    titleEn: '2026 Gaokao Math Elite Mock Exam (Calculus, Analytic Geometry & Sequences)',
    subject: '数学',
    gradeLevel: '高三/高考',
    semester: '上学期',
    countryRegion: '中国大陆',
    publisher: '新高考名校联合命题组',
    paperCategory: 'elite_school',
    difficulty: 'hard',
    durationMinutes: 90,
    totalScore: 120,
    passingScore: 72,
    description: '对标新高考九省联考与全国新高考卷题型结构，涵盖复数、向量、抽象函数多选、二项式定理、导数极值与椭圆综合大题。',
    descriptionEn: 'Rigorous benchmark aligned with New Gaokao format: complex numbers, vectors, derivative monotonicity, and ellipse geometry.',
    questions: [
      {
        id: 'gkmath-q1',
        subject: '数学',
        gradeStage: '高中',
        gradeLevel: '高三/高考',
        topic: '复数四则运算与几何意义',
        topicEn: 'Complex Number Arithmetic & Argand Plane',
        question: '已知虚数单位为 i，复数 z 满足 (1 + 2i) * z = 5i，则 z 的共轭复数 z̄ 在复平面内对应的点位于：',
        questionEn: 'Given imaginary unit i, complex number z satisfies (1+2i)*z = 5i. In which quadrant does conjugate z̄ lie in the complex plane?',
        options: ['第一象限', '第二象限', '第三象限', '第四象限'],
        optionsEn: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'],
        correctIndex: 0,
        explanation: '【解析】\nz = 5i / (1 + 2i) = 5i*(1 - 2i) / [(1 + 2i)*(1 - 2i)] = (5i + 10) / (1 + 4) = (10 + 5i) / 5 = 2 + i。\n因此其共轭复数 z̄ = 2 - i（对应点 (2, -1) 位于第四象限；若求 z̄ 的相反数或原数对应的坐标，仔细看题意：z = 2 + i 位于第一象限，z̄ 对应点为 (2, -1) 位于第四象限）。重新核对选项：选第四象限 D。',
        explanationEn: 'z = 5i/(1+2i) = 5i(1-2i)/5 = 2 + i. The complex conjugate z̄ = 2 - i, which corresponds to point (2, -1) in Quadrant IV.',
        questionType: 'choice',
        difficulty: 'easy',
        score: 15,
        keyPoints: ['复数除法分子分母有理化', '共轭复数概念', '复平面象限判定']
      },
      {
        id: 'gkmath-q2',
        subject: '数学',
        gradeStage: '高中',
        gradeLevel: '高三/高考',
        topic: '抽象函数性质与奇偶对称性（多选题）',
        topicEn: 'Abstract Function Properties & Derivatives (Multi-Choice)',
        question: '【多选题】已知定义在 R 上的函数 f(x) 满足 f(x + 2) = -f(x)，且当 x ∈ [0, 1] 时 f(x) = x^2。若 f(x) 的导函数为 f\'(x)，则下列结论正确的有：',
        questionEn: '[Multi-Choice] Function f(x) on R satisfies f(x+2) = -f(x), and for x ∈ [0, 1], f(x) = x^2. Which of the following statements are TRUE?',
        options: [
          'A. f(x) 是以 4 为周期的周期函数',
          'B. f(2026) = 0',
          'C. 函数 f(x) 的图象关于点 (2, 0) 对称',
          'D. 当 x ∈ [1, 2] 时，f(x) 的最大值为 1'
        ],
        optionsEn: [
          'A. f(x) is periodic with fundamental period T = 4',
          'B. f(2026) = 0',
          'C. The graph of f(x) is symmetric about point (2, 0)',
          'D. Maximum value of f(x) on interval [1, 2] is 1'
        ],
        correctIndices: [0, 1, 2],
        explanation: '【解析】\n1. f(x+4) = f((x+2)+2) = -f(x+2) = -(-f(x)) = f(x)，故周期 T = 4，A 正确；\n2. f(2026) = f(4*506 + 2) = f(2) = -f(0) = 0，B 正确；\n3. 由 f(x+2) = -f(x) 令 x 替换为 -x + 2 => f(4-x) = -f(2-x)，图象关于 (2, 0) 中心对称，C 正确；\n4. 综上 A、B、C 正确。',
        explanationEn: '1. f(x+4) = -f(x+2) = f(x) => Period T = 4 (A true).\n2. f(2026) = f(2) = -f(0) = 0 (B true).\n3. f(x+2) = -f(x) implies central symmetry around (2, 0) (C true).\nCorrect answers: A, B, C.',
        questionType: 'multi_choice',
        difficulty: 'hard',
        score: 20,
        keyPoints: ['函数周期性判定', '中心对称与对称轴', '抽象函数赋值法']
      },
      {
        id: 'gkmath-q3',
        subject: '数学',
        gradeStage: '高中',
        gradeLevel: '高三/高考',
        topic: '二项式定理与展开式指定项系数',
        topicEn: 'Binomial Theorem Coefficient Calculation',
        question: '在 (2x - 1/x)^6 的二项展开式中，常数项的值为_______（填具体整数）。',
        questionEn: 'In the binomial expansion of (2x - 1/x)^6, the constant term equals _______:',
        correctAnswerText: '160',
        explanation: '【解析】\n通项公式为 T_{r+1} = C(6, r) * (2x)^{6-r} * (-1/x)^r = C(6, r) * 2^{6-r} * (-1)^r * x^{6-2r}。\n令 x 的指数 6 - 2r = 0 => 2r = 6 => r = 3。\n代入 r = 3：\n常数项 = C(6, 3) * 2^(6-3) * (-1)^3 = 20 * 2^3 * (-1) = 20 * 8 * (-1) = -160 （注意负号系数）。',
        explanationEn: 'General term Tr+1 = C(6, r) * (2x)^(6-r) * (-x^-1)^r. Setting power 6 - 2r = 0 yields r = 3. Coefficient = C(6,3) * 2^3 * (-1)^3 = 20 * 8 * (-1) = -160.',
        questionType: 'fill',
        difficulty: 'medium',
        score: 15,
        keyPoints: ['二项式通项公式', '常数项与指定幂次', '负号与组合数运算']
      },
      {
        id: 'gkmath-q4',
        subject: '数学',
        gradeStage: '高中',
        gradeLevel: '高三/高考',
        topic: '立体几何：二面角与空间向量法',
        topicEn: 'Solid Geometry: Spatial Vectors & Dihedral Angle',
        question: '在正三棱柱 ABC-A1B1C1 中，所有棱长均为 2，点 D 为侧棱 AA1 的中点。求二面角 D-BC-A 的平面角余弦值 cosθ。',
        questionEn: 'In a regular triangular prism ABC-A1B1C1 with edge length 2, D is the midpoint of AA1. Find the cosine of dihedral angle D-BC-A:',
        correctAnswerText: '√3 / 2 (或 cosθ = √3/2, 对应 30°)',
        explanation: '【解析】\n建立以底面正三角形中心或边中点为原点的空间直角坐标系。求出平面 DBC 的法向量 n1 与底面 ABC 的法向量 n2 = (0, 0, 1)。通过向量数量积公式 cosθ = |n1·n2| / (|n1|*|n2|) 得到 cosθ = √3/2。',
        explanationEn: 'Using spatial coordinates: normal vector of plane DBC and base plane ABC gives cosθ = |n1·n2|/(|n1||n2|) = √3/2 (30 degrees).',
        questionType: 'fill',
        difficulty: 'medium',
        score: 20,
        keyPoints: ['空间直角坐标系建立', '平面法向量求法', '二面角余弦值计算']
      },
      {
        id: 'gkmath-q5',
        subject: '数学',
        gradeStage: '高中',
        gradeLevel: '高三/高考',
        topic: '导数综合大题：单调性讨论与极值点偏移证明',
        topicEn: 'Comprehensive Calculus: Monotonicity & Extrema Offset Proof',
        question: '【综合解答压轴题】已知函数 f(x) = ln(x) - a*x + (a - 1)/x，其中 a ∈ R。\n(1) 当 a = 1 时，求曲线 y = f(x) 在点 (1, f(1)) 处的切线方程；\n(2) 若函数 f(x) 在区间 (0, +∞) 上存在两个不同的极值点 x1, x2 (x1 < x2)，求实数 a 的取值范围，并证明 x1 + x2 > 2。',
        questionEn: '[Calculus Capstone] Given f(x) = ln(x) - ax + (a-1)/x for a ∈ R:\n(1) For a=1, find the tangent line equation at (1, f(1));\n(2) If f(x) has two distinct extrema points x1 < x2 in (0, ∞), find range of a, and prove x1 + x2 > 2.',
        correctAnswerText: '(1) 切线方程为 y = -x + 1 (或 x + y - 1 = 0)\n(2) 实数 a 的取值范围为 a > 1；利用分析法或构造差函数法可证得 x1 + x2 > 2。',
        explanation: '【规范大题推导步骤与评分细则】：\n1. 第 (1) 小问 (8分)：\n   - 当 a = 1 时，f(x) = ln(x) - x，定义域 (0, +∞)。\n   - f(1) = ln(1) - 1 = -1。点坐标为 (1, -1)。\n   - 求导数：f\'(x) = 1/x - 1。切线斜率 k = f\'(1) = 1 - 1 = 0。\n   - 故切线方程为 y - (-1) = 0*(x - 1) => y = -1。\n2. 第 (2) 小问 (22分)：\n   - 对 f(x) 求导：f\'(x) = 1/x - a - (a - 1)/x^2 = (-a*x^2 + x - a + 1) / x^2。\n   - 令分子 g(x) = -a*x^2 + x - a + 1 = 0。\n   - 由题意方程在 (0, +∞) 有两个不同正根，需满足：\n     ① a > 0；② 判别式 Δ = 1 - 4*(-a)*(-a+1) = 1 - 4a(a-1) = -4a^2 + 4a + 1 > 0；③ 韦达定理 x1+x2 = 1/a > 0，x1*x2 = (a-1)/a > 0 => a > 1。\n   - 结合可得 a 的取值范围为 1 < a < (1 + √2)/2。\n   - 极值点偏移证明：利用对数平均不等式或构造对称差函数 h(t) = f(t) - f(2 - t)，证得 x1 + x2 > 2。',
        explanationEn: 'Part 1: Tangent line evaluation at x=1 yields slope f\'(1) = 0 and equation y = -1.\nPart 2: Derivative f\'(x) numerator is quadratic. Vieta formulas require a > 1. Logarithmic mean inequality / symmetric difference function proves x1 + x2 > 2.',
        questionType: 'solution',
        difficulty: 'hard',
        score: 50,
        keyPoints: ['导数切线方程', '二次方程根的分布与韦达定理', '极值点偏移证明方法']
      }
    ]
  },
  {
    id: 'paper-zhongkao-math',
    title: '2026中考数学全真模拟真题套卷（二次函数、圆与动点几何压轴）',
    titleEn: '2026 Zhongkao Math Comprehensive Mock Exam (Quadratic Functions & Geometry)',
    subject: '数学',
    gradeLevel: '初三/中考',
    semester: '全学年',
    countryRegion: '中国大陆',
    publisher: '人教版 / 全国中考命题组',
    paperCategory: 'simulation',
    difficulty: 'hard',
    durationMinutes: 90,
    totalScore: 120,
    passingScore: 72,
    description: '针对中考数学二次函数图象性质、圆的切线证明、反比例函数面积不变性与动点三角形最值综合压轴仿真。',
    descriptionEn: 'Full Zhongkao sprint covering parabola properties, circle tangents, inverse proportional geometry, and moving point capstone.',
    questions: [
      {
        id: 'zkmath-q1',
        subject: '数学',
        gradeStage: '初中',
        gradeLevel: '初三/中考',
        topic: '科学记数法与实数估算',
        topicEn: 'Scientific Notation & Real Number Approximation',
        question: '2026 年我国某超级计算机峰值计算速度达到每秒 1 250 000 000 亿次浮点运算。将数字 1 250 000 000 用科学记数法表示为：',
        questionEn: 'Express 1,250,000,000 in standard scientific notation:',
        options: ['1.25 × 10^8', '1.25 × 10^9', '12.5 × 10^8', '0.125 × 10^10'],
        optionsEn: ['1.25 × 10^8', '1.25 × 10^9', '12.5 × 10^8', '0.125 × 10^10'],
        correctIndex: 1,
        explanation: '【解析】科学记数法形式为 a × 10^n，其中 1 ≤ |a| < 10，n 为小数点向左移动的位数。1 250 000 000 小数点左移 9 位，即 1.25 × 10^9。选 B。',
        explanationEn: 'Scientific notation requires 1 ≤ |a| < 10. Moving decimal 9 places gives 1.25 × 10^9. Option B.',
        questionType: 'choice',
        difficulty: 'easy',
        score: 15,
        keyPoints: ['科学记数法表示规则', '幂指数确定']
      },
      {
        id: 'zkmath-q2',
        subject: '数学',
        gradeStage: '初中',
        gradeLevel: '初三/中考',
        topic: '二次函数图象性质与符号判定',
        topicEn: 'Quadratic Function Graph & Coefficient Signs',
        question: '已知二次函数 y = a*x^2 + b*x + c (a ≠ 0) 的图象开口向上，对称轴为直线 x = 1，且经过点 (-1, 0)。给出以下结论：① b < 0；② 2a + b = 0；③ a - b + c = 0；④ 当 x > 1 时，y 随 x 的增大而增大。其中正确结论的个数为：',
        questionEn: 'For y = ax^2 + bx + c (a≠0) opening up, axis x = 1, passing (-1, 0). Evaluate: ① b<0; ② 2a+b=0; ③ a-b+c=0; ④ for x>1, y increases with x. How many are TRUE?',
        options: ['1 个', '2 个', '3 个', '4 个'],
        optionsEn: ['1', '2', '3', '4'],
        correctIndex: 3,
        explanation: '【解析】\n1. 开口向上 => a > 0。对称轴 x = -b/(2a) = 1 => b = -2a < 0，故 ①、② 均正确；\n2. 图象过点 (-1, 0) => 将 x = -1 代入得 a*(-1)^2 + b*(-1) + c = a - b + c = 0，故 ③ 正确；\n3. 开口向上的抛物线，在对称轴 x = 1 右侧（x > 1），y 随 x 增大而增大，故 ④ 正确。\n四个结论全部正确，选 D (4个)。',
        explanationEn: 'All 4 statements (①, ②, ③, ④) are mathematically correct based on symmetry axis and vertex properties. Option D.',
        questionType: 'choice',
        difficulty: 'medium',
        score: 15,
        keyPoints: ['二次函数对称轴公式', '抛物线增减性', '点在抛物线上代入法']
      },
      {
        id: 'zkmath-q3',
        subject: '数学',
        gradeStage: '初中',
        gradeLevel: '初三/中考',
        topic: '特殊平行四边形与几何判定（多选题）',
        topicEn: 'Special Parallelograms & Geometry Theorems (Multi-Choice)',
        question: '【多选题】下列关于特殊平行四边形的几何命题中，属于真命题的有：',
        questionEn: '[Multi-Choice] Which of the following geometry statements are TRUE propositions?',
        options: [
          'A. 对角线互相垂直平分的四边形是菱形',
          'B. 对角线相等的平行四边形是矩形',
          'C. 有一个角是直角且对角线垂直的平行四边形是正方形',
          'D. 顺次连接任意四边形各边中点所得的四边形一定是矩形'
        ],
        optionsEn: [
          'A. A quadrilateral whose diagonals are perpendicular and bisect each other is a rhombus',
          'B. A parallelogram with equal diagonals is a rectangle',
          'C. A parallelogram with one right angle and perpendicular diagonals is a square',
          'D. Connecting midpoints of any arbitrary quadrilateral always yields a rectangle'
        ],
        correctIndices: [0, 1, 2],
        explanation: '【解析】\nA. 对角线互相平分是平行四边形，再加垂直即为菱形，真命题；\nB. 对角线相等的平行四边形是矩形，真命题；\nC. 有一个角是直角（为矩形）+ 对角线垂直（邻边相等为菱形），既是矩形又是菱形即为正方形，真命题；\nD. 中点四边形形状由原四边形对角线关系决定，只有原四边形对角线互相垂直时，中点四边形才是矩形，假命题。\n正确答案为 A、B、C。',
        explanationEn: 'A, B, and C are classic true geometric theorems. D requires original diagonals to be perpendicular to guarantee a rectangle. Options A, B, C.',
        questionType: 'multi_choice',
        difficulty: 'medium',
        score: 20,
        keyPoints: ['菱形判定定理', '矩形与正方形判定', '中点四边形性质']
      },
      {
        id: 'zkmath-q4',
        subject: '数学',
        gradeStage: '初中',
        gradeLevel: '初三/中考',
        topic: '圆的切线与面积割补求长度',
        topicEn: 'Circle Tangent Length & Hypotenuse Radius',
        question: '在 Rt△ABC 中，∠C = 90°，AC = 6，BC = 8。以点 C 为圆心、R 为半径作 ⊙C，当 ⊙C 与斜边 AB 相切时，半径 R 的长为_______。',
        questionEn: 'In right △ABC (∠C=90°, AC=6, BC=8), a circle centered at C with radius R is tangent to hypotenuse AB. The radius R equals _______:',
        correctAnswerText: '4.8 (即 24/5)',
        explanation: '【解析】\n1. 由勾股定理求得斜边 AB = √(AC^2 + BC^2) = √(6^2 + 8^2) = 10。\n2. 设斜边上的高为 h（即圆 C 与斜边相切时的切线垂直半径 R）。\n3. 利用直角三角形面积恒等式：S = (1/2)*AC*BC = (1/2)*AB*R => 6 * 8 = 10 * R => R = 48 / 10 = 4.8。',
        explanationEn: 'Hypotenuse AB = √(36+64) = 10. Area = 0.5*AC*BC = 0.5*AB*R => R = (6*8)/10 = 4.8.',
        questionType: 'fill',
        difficulty: 'medium',
        score: 20,
        keyPoints: ['勾股定理', '直角三角形面积法求高', '圆的切线性质']
      },
      {
        id: 'zkmath-q5',
        subject: '数学',
        gradeStage: '初中',
        gradeLevel: '初三/中考',
        topic: '二次函数与动点四边形面积最值综合压轴题',
        topicEn: 'Capstone Solution: Parabola & Moving Point Area Extremum',
        question: '【综合压轴大题】如图，抛物线 y = -x^2 + 2x + 3 与 x 轴交于 A、B 两点（点 A 在点 B 左侧），与 y 轴交于点 C。\n(1) 求 A、B、C 三点的坐标及抛物线的顶点坐标；\n(2) 点 P 为抛物线在第一象限内图象上的一个动点，过点 P 作 PQ 垂直于 x 轴交直线 BC 于点 Q，当线段 PQ 的长度最大时，求点 P 的坐标及 PQ 的最大长度；\n(3) 在 (2) 的条件下，是否存在点 M 在抛物线对称轴上，使得以 B、C、P、M 为顶点的四边形为平行四边形？若存在，求出点 M 的坐标；若不存在，请说明理由。',
        questionEn: '[Capstone Geometry Solution] Parabola y = -x^2 + 2x + 3 intersects x-axis at A, B (A left of B) and y-axis at C.\n(1) Find coordinates of A, B, C and the parabola vertex;\n(2) P is a moving point in quadrant I on parabola. PQ ⊥ x-axis intersects line BC at Q. Find P and max length of PQ;\n(3) Does point M on axis of symmetry exist making B, C, P, M a parallelogram? If so, find M.',
        correctAnswerText: '(1) A(-1, 0), B(3, 0), C(0, 3), 顶点坐标 (1, 4)\n(2) 当 x = 1.5 时，PQ 取得最大值 2.25，此时点 P 坐标为 (1.5, 3.75)\n(3) 存在符合条件的点 M，坐标分别为 M1(1, 2) 或 M2(1, -2)',
        explanation: '【详细规范解题推导】：\n1. 第 (1) 问 (10分)：\n   - 令 y = 0 => -x^2 + 2x + 3 = 0 => (x - 3)(x + 1) = 0 => x1 = -1, x2 = 3。故 A(-1, 0), B(3, 0)。\n   - 令 x = 0 => y = 3，故 C(0, 3)。\n   - 抛物线配方：y = -(x - 1)^2 + 4，顶点坐标为 (1, 4)。\n2. 第 (2) 问 (20分)：\n   - 设直线 BC 解析式为 y = kx + b，代入 B(3, 0), C(0, 3) => y = -x + 3。\n   - 设点 P 坐标为 (m, -m^2 + 2m + 3)，其中 0 < m < 3。则 Q 点坐标为 (m, -m + 3)。\n   - 线段 PQ 长度 = y_P - y_Q = (-m^2 + 2m + 3) - (-m + 3) = -m^2 + 3m。\n   - 配方：PQ = -(m - 1.5)^2 + 2.25。\n   - 故当 m = 1.5 时，PQ 取得最大值 2.25，此时点 P 坐标为 (1.5, 3.75)。\n3. 第 (3) 问 (20分)：\n   - 对称轴为直线 x = 1，设 M(1, t)。\n   - 分类讨论四边形对角线中点重合：\n     ① BC 为对角线时，x_B + x_C = x_P + x_M => 3 + 0 = 1.5 + 1 (不成立，舍去)；\n     ② BP 为对角线时，y_B + y_P = y_C + y_M => 0 + 3.75 = 3 + t => t = 0.75，对应中点核验；\n     ③ CP 为对角线时，y_C + y_P = y_B + y_M => 3 + 3.75 = 0 + t => t = 6.75。\n   - 综合得出所有满足平行四边形顶点的 M 坐标。',
        explanationEn: '1. Factoring yields roots x=-1, 3. C is (0,3), vertex is (1,4).\n2. Line BC is y = -x+3. Vertical distance PQ = -m^2 + 3m, maximized at m=1.5 with max length 2.25.\n3. Midpoint coordinates classification yields valid locations for M on line x=1.',
        questionType: 'solution',
        difficulty: 'hard',
        score: 50,
        keyPoints: ['待定系数法求直线解析式', '二次函数铅垂线段最值模型', '平行四边形存在性分类讨论']
      }
    ]
  },
  {
    id: 'paper-ielts-acad',
    title: 'IELTS Academic English Practice Test (Reading, Grammar & Discourse Analysis)',
    titleEn: 'IELTS Academic English Practice Test (Reading, Grammar & Discourse Analysis)',
    subject: '英语',
    gradeLevel: 'Grade 12 / 雅思',
    semester: '全学年',
    countryRegion: '国际/英国',
    publisher: 'Cambridge IELTS Standard Syllabus',
    paperCategory: 'simulation',
    difficulty: 'hard',
    durationMinutes: 60,
    totalScore: 100,
    passingScore: 65,
    description: 'Targeted diagnostics for IELTS 7.0+ candidates covering advanced lexical precision, discourse markers, and academic essay critique.',
    descriptionEn: 'Academic reading, lexical nuances, cohesion and coherence assessment for IELTS candidates.',
    questions: [
      {
        id: 'ielts-q1',
        subject: '英语',
        gradeStage: '大学/技能',
        gradeLevel: 'Grade 12 / 雅思',
        topic: 'Academic Vocabulary & Context Collocations',
        topicEn: 'Academic Vocabulary & Context Collocations',
        question: 'Select the most appropriate academic word to fill in the blank:\n"The newly introduced carbon pricing mechanism is anticipated to _______ industry-wide emissions over the forthcoming five-year cycle."',
        questionEn: 'Select the most appropriate academic word to fill in the blank:\n"The newly introduced carbon pricing mechanism is anticipated to _______ industry-wide emissions over the forthcoming five-year cycle."',
        options: ['mitigate', 'exacerbate', 'accumulate', 'deteriorate'],
        optionsEn: ['mitigate (减轻/缓解)', 'exacerbate (恶化)', 'accumulate (积累)', 'deteriorate (退化)'],
        correctIndex: 0,
        explanation: '【解析】"Mitigate" 意为减轻、缓和（负面影响），"mitigate emissions" 为学术英语及雅思写作大作文中最高频的地道词伙搭配。选 A。',
        explanationEn: '"Mitigate" means to make less severe, harmful, or painful. "Mitigate emissions" is a formal academic collocation. Option A.',
        questionType: 'choice',
        difficulty: 'medium',
        score: 20,
        keyPoints: ['Academic Collocations', 'IELTS Writing Task 2 Lexical Resource']
      },
      {
        id: 'ielts-q2',
        subject: '英语',
        gradeStage: '大学/技能',
        gradeLevel: 'Grade 12 / 雅思',
        topic: 'Academic Reading: True/False/Not Given Analysis (Multi-Choice)',
        topicEn: 'Academic Reading: True/False/Not Given Analysis (Multi-Choice)',
        question: '【多选题】Read the passage excerpt:\n"Although algorithmic trading accounts for over 70% of equity volume in developed markets, regulators remain divided over whether high-frequency algorithms genuinely enhance liquidity or merely amplify market fragility during liquidity crunches."\nWhich of the following inferences are TRUE according to the passage?',
        questionEn: '[Multi-Choice] Which inferences are TRUE according to the excerpt above?',
        options: [
          'A. Algorithmic trading constitutes a dominant majority of stock trading volume in developed markets.',
          'B. Regulators have reached a global consensus regarding the stabilizing effect of high-frequency trading.',
          'C. There are ongoing concerns that high-frequency algorithms could potentially exacerbate market fragility under stress.',
          'D. High-frequency algorithms have completely replaced traditional floor traders in all markets.'
        ],
        optionsEn: [
          'A. Algorithmic trading constitutes a dominant majority of stock trading volume in developed markets.',
          'B. Regulators have reached a global consensus regarding the stabilizing effect of high-frequency trading.',
          'C. There are ongoing concerns that high-frequency algorithms could potentially exacerbate market fragility under stress.',
          'D. High-frequency algorithms have completely replaced traditional floor traders in all markets.'
        ],
        correctIndices: [0, 2],
        explanation: '【解析】\n1. "accounts for over 70%" 对应 A 选项 "dominant majority"，为正确推理；\n2. "regulators remain divided" 说明存在分歧，B 选项 "reached global consensus" 与原文直接冲突，错误；\n3. "merely amplify market fragility during liquidity crunches" 对应 C 选项，为正确推理；\n4. D 选项 "completely replaced... in all markets" 过于绝对，原文未提及 (Not Given)。\n正确选项为 A、C。',
        explanationEn: 'Statement A is supported by "over 70%". Statement C matches "amplify market fragility". B contradicts "remain divided", and D is unsupported exaggeration. Options A and C.',
        questionType: 'multi_choice',
        difficulty: 'hard',
        score: 25,
        keyPoints: ['IELTS Reading Inference', 'Identifying Extreme Modifiers', 'Paraphrasing Skills']
      },
      {
        id: 'ielts-q3',
        subject: '英语',
        gradeStage: '大学/技能',
        gradeLevel: 'Grade 12 / 雅思',
        topic: 'Grammatical Transformation & Inversion',
        topicEn: 'Grammatical Transformation & Inversion',
        question: 'Rewrite the sentence using negative inversion starting with "Seldom":\n"Researchers have rarely encountered such resilient microbiological organisms in high-salinity deep-sea hydrothermal vents."',
        questionEn: 'Rewrite the sentence using negative inversion starting with "Seldom":\n"Researchers have rarely encountered such resilient microbiological organisms in high-salinity deep-sea hydrothermal vents."',
        correctAnswerText: 'Seldom have researchers encountered such resilient microbiological organisms in high-salinity deep-sea hydrothermal vents.',
        explanation: '【解析】否定副词 Seldom 置于句首时，句子需要部分倒装（将助动词 have 提到主语 researchers 之前）。',
        explanationEn: 'When negative or restrictive adverbs (seldom, rarely, scarcely) begin a clause, inverted word order (Auxiliary + Subject + Main Verb) is required.',
        questionType: 'fill',
        difficulty: 'medium',
        score: 25,
        keyPoints: ['Partial Inversion (部分倒装)', 'Negative Adverb Fronting', 'Advanced Cohesion']
      },
      {
        id: 'ielts-q4',
        subject: '英语',
        gradeStage: '大学/技能',
        gradeLevel: 'Grade 12 / 雅思',
        topic: 'IELTS Writing Task 2 Discourse Critique',
        topicEn: 'IELTS Writing Task 2 Discourse Critique',
        question: '【Academic Analysis / Solution】Explain the core structural requirements of an IELTS Task 2 "To what extent do you agree or disagree" essay to achieve Band 8.0 in Task Achievement and Coherence & Cohesion. List at least 3 key structural elements.',
        questionEn: '[Academic Analysis / Solution] Outline 3 essential structural criteria for achieving Band 8.0 in IELTS Writing Task 2 (Opinion/Argumentative essay):',
        correctAnswerText: '1. Clear thesis statement in Introduction stating a nuanced stance\n2. Well-developed body paragraphs with topic sentence, explanation, concrete evidence, and counter-argument concession\n3. Consistent paragraph linking devices and logical conclusion synthesizing key arguments',
        explanation: '【解析指南】：\n1. 引言段：必须包含背景改写 (Paraphrase) 与清晰的个人明确立场 (Thesis Statement)；\n2. 正文主体段：每段有且仅有一个中心论点 (Topic Sentence)，展开充分论证并辅以逻辑解释与权威案例，必要时设置让步反驳 (Concession & Refutation)；\n3. 结论段：总结核心分论点，重申深化论点，严禁引入未经论证的新观点。',
        explanationEn: 'Band 8 criteria require a clear relevant position throughout, well-extended main ideas with logical progression, flexible use of cohesive devices, and a comprehensive conclusion.',
        questionType: 'solution',
        difficulty: 'hard',
        score: 30,
        keyPoints: ['Task Achievement Band Descriptors', 'Paragraph Logical Cohesion', 'Counter-argument Concession']
      }
    ]
  }
];


export const INITIAL_PLANS: GeneratedStudyPlan[] = [
  {
    id: 'plan-chu1-eng-1',
    title: '七年级英语：核心词汇、语法体系与日常交际 7 天满分突破计划',
    subject: '英语',
    gradeLevel: '初一',
    targetGoal: '全面掌握一般现在时、动词三单变形规则、人称/物主代词与 There be 句型及日常交际表达',
    language: 'zh',
    createdAt: new Date().toISOString(),
    overview: '专为初中七年级（初一）学生量身定制的 7 天英语核心能力提升计划，紧扣人教版新课标重难点，通过“概念剖析 + 艾宾浩斯高频词汇翻卡 + 情境对话 + 真题自测”形成高效学习闭环。',
    estimatedDays: 7,
    keyTopics: [
      'be 动词用法与一般现在时基础句型',
      '实义动词第三人称单数 (3rd Person Singular) 4 大变化法则',
      '人称代词（主格/宾格）与物主代词（形物代/名物代）系统图表',
      'There be 句型与空间方位介词 (in/on/under/behind/next to)',
      '情态动词 can / can\'t 能力与俱乐部情境表达',
      '日常交际问答：日常作息、喜好学科、购物与问路'
    ],
    dailyTasks: [
      {
        dayOffset: 0,
        title: 'Day 1: be 动词用法口诀与一般现在时主谓一致',
        description: '掌握“我用 am，你用 are，is 连着他她它，单数 is 复数 are”口诀，练习肯定、否定与一般疑问句转化。',
        subject: '英语',
        category: 'language',
        durationMinutes: 25,
        taskType: 'concept',
        difficulty: 'easy',
        keyPoints: ['be 动词口诀', '一般疑问句提前 be 动词', '肯定/否定回答规范']
      },
      {
        dayOffset: 1,
        title: 'Day 2: 动词第三人称单数变形规则与发音',
        description: '梳理一般加 -s、以 s/x/ch/sh/o 结尾加 -es、辅音+y 变 ies 及特殊变化 (have->has) 规律。',
        subject: '英语',
        category: 'language',
        durationMinutes: 25,
        taskType: 'practice',
        difficulty: 'medium',
        keyPoints: ['动词三单 4 大规则', '清辅音后读 /s/ 浊辅音及元音后读 /z/']
      },
      {
        dayOffset: 2,
        title: 'Day 3: 助动词 do / does 在否定句与疑问句中的降维',
        description: '掌握“借助助动词 do/does 后，后面的实义动词必须打回原形”的金牌法则。',
        subject: '英语',
        category: 'language',
        durationMinutes: 30,
        taskType: 'concept',
        difficulty: 'medium',
        keyPoints: ['Does she like...? Yes, she does.', '实义动词还原形']
      },
      {
        dayOffset: 3,
        title: 'Day 4: 代词大家族（主格、宾格、形物代、名物代）',
        description: '用九宫格表格理清 I-me-my-mine, she-her-her-hers 等代词的句子成分对应。',
        subject: '英语',
        category: 'language',
        durationMinutes: 20,
        taskType: 'flashcard',
        difficulty: 'easy',
        keyPoints: ['形物代后必须加名词', '名物代 = 形物代 + 名词']
      },
      {
        dayOffset: 4,
        title: 'Day 5: There be 句型与就近原则实战演练',
        description: '攻克 There is a book and two pens... 与 There are two pens and a book... 就近选择。',
        subject: '英语',
        category: 'language',
        durationMinutes: 25,
        taskType: 'practice',
        difficulty: 'medium',
        keyPoints: ['就近原则 (Proximity Rule)', '方位介词短语 in front of vs in the front of']
      },
      {
        dayOffset: 5,
        title: 'Day 6: 七年级日常情境交际高频句型操练',
        description: '练习日常作息 (What time do you get up?)、爱好学科与原因 (Why do you like geography?) 及能力表达 (Can you play the guitar?)。',
        subject: '英语',
        category: 'language',
        durationMinutes: 25,
        taskType: 'practice',
        difficulty: 'easy',
        keyPoints: ['特殊疑问词 what/why/how/where', '情态动词 can 用法']
      },
      {
        dayOffset: 6,
        title: 'Day 7: 七年级全单元综合自测与易错词汇速记',
        description: '完成 10 道综合单选与短文填空，翻卡复习本周掌握的 20 个高频词汇。',
        subject: '英语',
        category: 'language',
        durationMinutes: 35,
        taskType: 'quiz',
        difficulty: 'medium',
        keyPoints: ['综合模拟题诊断', '错题巩固复盘']
      }
    ],
    flashcards: [
      {
        front: 'favorite',
        phonetic: '/ˈfeɪvərɪt/',
        back: 'adj. 最喜爱的；n. 最喜爱的人或物\n用法：one\'s favorite subject (某人最喜欢的科目)',
        examples: [
          'My favorite subject is English because it is very interesting.',
          'Science is her favorite.'
        ],
        language: 'en',
        tags: ['七年级', '英语', '核心词汇', 'Unit 9']
      },
      {
        front: 'schedule',
        phonetic: '/ˈskedʒuːl/',
        back: 'n. 日程安排，时间表；v. 安排\n搭配：a busy schedule (忙碌的日程)',
        examples: [
          'I have a very busy schedule from Monday to Friday.'
        ],
        language: 'en',
        tags: ['七年级', '英语', '日常词汇']
      },
      {
        front: 'delicious',
        phonetic: '/dɪˈlɪʃəs/',
        back: 'adj. 美味的，可口的\n同义词：tasty, yummy',
        examples: [
          'The dumplings in this restaurant are really delicious!'
        ],
        language: 'en',
        tags: ['七年级', '英语', '食物与描述']
      },
      {
        front: 'instrument',
        phonetic: '/ˈɪnstrəmənt/',
        back: 'n. 乐器；器械，仪器\n搭配：play a musical instrument (演奏乐器)',
        examples: [
          'Can you play any musical instruments, like the piano or guitar?'
        ],
        language: 'en',
        tags: ['七年级', '英语', '俱乐部与爱好']
      },
      {
        front: 'geography',
        phonetic: '/dʒiˈɒɡrəfi/',
        back: 'n. 地理（学）\n学科常考：history, geography, biology, math, English',
        examples: [
          'We have geography class every Tuesday afternoon.'
        ],
        language: 'en',
        tags: ['七年级', '英语', '学校科目']
      }
    ],
    quizQuestions: [
      {
        question: '— What does your brother usually _______ on Sunday morning?\n— He often _______ his homework.',
        options: ['do; does', 'does; do', 'do; do', 'does; does'],
        correctIndex: 0,
        explanation: '第一空助动词 does 后动词用原形 do；答句主语 He 是第三人称单数，动词用三单形式 does。选 A。'
      },
      {
        question: 'There _______ an apple and three oranges in the basket on the table.',
        options: ['is', 'are', 'be', 'have'],
        correctIndex: 0,
        explanation: 'There be 句型遵循就近原则，离 be 动词最近的名词 an apple 是单数，用 is。选 A。'
      },
      {
        question: '— Can Mary _______ the guitar?\n— Yes, she can. She is in the school music club.',
        options: ['play', 'plays', 'playing', 'to play'],
        correctIndex: 0,
        explanation: '情态动词 can 后面必须接动词原形 play。选 A。'
      }
    ]
  },
  {
    id: 'plan-chu1-1',
    title: '初一数学：有理数运算与一元一次方程高分突破',
    subject: '数学',
    gradeLevel: '初一',
    targetGoal: '彻底攻克有理数正负数运算、绝对值化简与一元一次方程应用题',
    language: 'zh',
    createdAt: new Date().toISOString(),
    overview: '本计划专为初一（七年级）学生量身打造，涵盖初中数学开篇核心考点，助你在新学期打下坚实的数学逻辑框架。',
    estimatedDays: 7,
    keyTopics: ['有理数与数轴', '绝对值几何意义', '代数式合并同类项', '一元一次方程解法与实际应用'],
    dailyTasks: [
      {
        dayOffset: 0,
        title: '有理数与数轴点的位置判定',
        description: '复习正负数概念、相反数与数轴图解关系。',
        subject: '数学',
        category: 'math',
        durationMinutes: 25,
        taskType: 'concept',
        difficulty: 'easy',
        keyPoints: ['数轴三要素', '相反数特征']
      },
      {
        dayOffset: 1,
        title: '绝对值去符号法则与分类讨论',
        description: '掌握根据代数式正负去掉绝对值符号的通用法则。',
        subject: '数学',
        category: 'math',
        durationMinutes: 30,
        taskType: 'practice',
        difficulty: 'medium',
        keyPoints: ['非负性', '数轴分类讨论']
      }
    ],
    flashcards: [
      {
        front: '绝对值的几何意义是什么？',
        back: '在数轴上，表示数 a 的点与原点的距离叫数 a 的绝对值 |a|。',
        examples: ['|-5| = 5', '|0| = 0'],
        language: 'zh',
        tags: ['初一', '数学', '绝对值']
      }
    ],
    quizQuestions: [
      {
        question: '下列关于有理数的说法中正确的是？',
        options: ['0 是最小的正数', '有理数分为正数和负数', '绝对值等于它本身的数是非负数', '互为相反数的两个数绝对值不相等'],
        correctIndex: 2,
        explanation: '非负数包括正数和 0，它们的绝对值都等于它本身。选 C。'
      }
    ]
  },
  {
    id: 'plan-physics-1',
    title: '高中物理：力学与动量守恒冲刺计划',
    subject: '高中物理',
    gradeLevel: '高中二年级 / 冲刺',
    targetGoal: '掌握牛顿三大定律、动量守恒定理与动能定理的应用',
    language: 'zh',
    createdAt: new Date().toISOString(),
    overview: '本计划针对高中物理核心考点“力学与动量守恒”设计，结合概念梳理、公式演练与模型辨析，助你在7天内建立扎实的解题框架。',
    estimatedDays: 7,
    keyTopics: ['牛顿第二定律', '受力分析与分解', '动量定理与动量守恒', '弹性与非弹性碰撞', '机械能守恒'],
    dailyTasks: [
      {
        dayOffset: 0,
        title: '受力分析与牛顿第二定律深度复习',
        description: '系统梳理重力、弹力、摩擦力的受力分析步骤，练习整体法与隔离法。',
        subject: '高中物理',
        category: 'science',
        durationMinutes: 30,
        taskType: 'concept',
        difficulty: 'medium',
        keyPoints: ['受力分析四步法', '正交分解法', '超重与失重特征']
      },
      {
        dayOffset: 0,
        title: '力学公式知识卡片记忆与默写',
        description: '复习力学核心公式与适用条件（如 $F=ma$, $f=\\mu N$）。',
        subject: '高中物理',
        category: 'science',
        durationMinutes: 20,
        taskType: 'flashcard',
        difficulty: 'easy',
        keyPoints: ['公式矢量性', '静摩擦力最大值求解']
      },
      {
        dayOffset: 1,
        title: '动量与冲量概念剖析',
        description: '理解 $p=mv$ 与 $I=Ft$ 的物理意义，推导动量定理。',
        subject: '高中物理',
        category: 'science',
        durationMinutes: 30,
        taskType: 'concept',
        difficulty: 'medium',
        keyPoints: ['冲量是矢量', '动量定理在碰撞中的运用']
      },
      {
        dayOffset: 2,
        title: '动量守恒定律三大典型模型训练',
        description: '掌握“碰撞模型”、“反冲模型”与“人船模型”的方程建立。',
        subject: '高中物理',
        category: 'science',
        durationMinutes: 45,
        taskType: 'practice',
        difficulty: 'hard',
        keyPoints: ['守恒条件判断', '动能损失分析']
      }
    ],
    flashcards: [
      {
        front: '动量守恒定律的适用条件是什么？',
        back: '系统不受外力，或者所受合外力为零；或者外力远小于内力（如碰撞、爆炸）；或者某一方向上合外力为零。',
        examples: ['两滑块在光滑水平面相撞：合外力为零，动量守恒。'],
        language: 'zh',
        tags: ['物理', '动量', '守恒定律']
      },
      {
        front: '完全弹性碰撞与完全非弹性碰撞的区别？',
        back: '完全弹性碰撞：动量守恒且机械能无损失；完全非弹性碰撞：动量守恒，但机械能损失最大（碰撞后粘在一起共同运动）。',
        examples: ['钢球碰撞接近弹性碰撞', '子弹打入木块属于完全非弹性碰撞'],
        language: 'zh',
        tags: ['物理', '碰撞模型']
      }
    ],
    quizQuestions: [
      {
        question: '一质量为 m 的小球以速度 v 垂直撞击墙壁后以原速率反弹，墙壁对小球的冲量大小为多少？',
        options: ['0', 'mv', '2mv', '0.5mv'],
        correctIndex: 2,
        explanation: '取反弹方向为正方向，初速度为 -v，末速度为 v。冲量 I = Δp = m*v - m*(-v) = 2mv。'
      }
    ]
  },
  {
    id: 'plan-ielts-1',
    title: '雅思 7.0+ 核心学术词汇与表达突破',
    subject: '英语雅思 (IELTS)',
    gradeLevel: '大学 / 进阶 (B2-C1)',
    targetGoal: '攻克 30 个高频学术写作与阅读核心词汇及替换句型',
    language: 'en',
    createdAt: new Date().toISOString(),
    overview: 'Targeted study plan for mastering C1-level academic vocabulary, paraphrasing techniques, and collocations required for IELTS Academic Writing & Reading.',
    estimatedDays: 10,
    keyTopics: ['Academic Verbs & Nouns', 'Collocations for Essay Writing', 'Paraphrasing Techniques', 'Cohesive Devices'],
    dailyTasks: [
      {
        dayOffset: 0,
        title: 'Master 10 High-Frequency Academic Verbs',
        description: 'Learn terms like "substantiate", "exacerbate", "facilitate", "advocate", and "mitigate" with context sentences.',
        subject: '英语雅思',
        category: 'language',
        durationMinutes: 25,
        taskType: 'flashcard',
        difficulty: 'medium',
        keyPoints: ['Usage in Task 2 essays', 'Synonyms and collocations']
      },
      {
        dayOffset: 0,
        title: 'IELTS Vocabulary Flashcard Review Session',
        description: 'Active recall and pronunciation check for today\'s new word deck.',
        subject: '英语雅思',
        category: 'language',
        durationMinutes: 15,
        taskType: 'review',
        difficulty: 'easy',
        keyPoints: ['Pronunciation & Stress', 'Spelling accuracy']
      },
      {
        dayOffset: 1,
        title: 'Paraphrasing Practice: Environmental & Tech Topics',
        description: 'Practice rewriting Task 2 prompt sentences using target academic vocabulary.',
        subject: '英语雅思',
        category: 'language',
        durationMinutes: 30,
        taskType: 'practice',
        difficulty: 'hard',
        keyPoints: ['Avoiding repetition', 'Formal academic tone']
      }
    ],
    flashcards: [
      {
        front: 'Mitigate',
        phonetic: '/ˈmɪtɪɡeɪt/',
        back: 'v. 使减轻，使缓和 (to make something less harmful, serious, or severe)',
        examples: [
          'Governments should take immediate measures to mitigate the environmental impact of industrial waste.',
          'Renewable energy can help mitigate climate change.'
        ],
        language: 'en',
        tags: ['IELTS', 'Vocabulary', 'Writing Task 2']
      },
      {
        front: 'Substantiate',
        phonetic: '/səbˈstænʃieɪt/',
        back: 'v. 证实，证明 (to provide evidence to support or prove the truth of)',
        examples: [
          'The researcher provided empirical data to substantiate her hypothesis.'
        ],
        language: 'en',
        tags: ['IELTS', 'Academic']
      },
      {
        front: 'Exacerbate',
        phonetic: '/ɪɡˈzæsərbeɪt/',
        back: 'v. 使加剧，使恶化 (to make a problem, bad situation, or negative feeling worse)',
        examples: [
          'Heavy traffic congestion exacerbates urban air pollution.'
        ],
        language: 'en',
        tags: ['IELTS', 'Writing Task 2']
      }
    ],
    quizQuestions: [
      {
        question: 'Choose the best synonym for "mitigate" in the sentence: "Policies were implemented to mitigate risks."',
        options: ['Increase', 'Alleviate', 'Ignore', 'Complicate'],
        correctIndex: 1,
        explanation: '"Mitigate" means to alleviate, reduce, or lessen the severity of something.'
      }
    ]
  },
  {
    id: 'plan-jlpt-1',
    title: '日本語 N2 语法与高频表达强化计划',
    subject: '日语 (Japanese JLPT N2)',
    gradeLevel: '中级 / JLPT N2 备考',
    targetGoal: '精通 20 个 N2 易混淆语法句型与听力高频接续',
    language: 'ja',
    createdAt: new Date().toISOString(),
    overview: 'JLPT N2合格に向けた集中復習プラン。間違いやすい文法接続と読解・聴解で頻出する表現を効率的にマスターします。',
    estimatedDays: 7,
    keyTopics: ['～に違いない / ～に過ぎない', '～ざるを得ない', '～をめぐって', '～かねない / ～かねる'],
    dailyTasks: [
      {
        dayOffset: 0,
        title: 'N2 核心句型 5 选：心理与意志表达',
        description: '复习「～ざるを得ない」「～かねない」「～っこない」的接续与含义。',
        subject: '日语 N2',
        category: 'language',
        durationMinutes: 25,
        taskType: 'concept',
        difficulty: 'medium',
        keyPoints: ['动词否定形+ざるを得ない', 'かねない (有可能导致坏结果)']
      },
      {
        dayOffset: 0,
        title: 'N2 语法翻卡训练与例句朗读',
        description: '进行多语言卡片朗读复习，注意发音与音调。',
        subject: '日语 N2',
        category: 'language',
        durationMinutes: 15,
        taskType: 'flashcard',
        difficulty: 'easy',
        keyPoints: ['例句背诵', '听力习惯']
      }
    ],
    flashcards: [
      {
        front: '～ざるを得ない (zaru wo etanai)',
        back: '不得不……，不能不……（表达因客观状况无奈做出某行为）\n接続：動詞ナイ形＋ざるを得ない（する→せざるを得ない）',
        examples: [
          '台風が近づいているため、試合は延期せざるを得ない。',
          '理由を証明できない以上、謝罪せざるを得ない。'
        ],
        language: 'ja',
        tags: ['JLPT N2', '文法']
      },
      {
        front: '～かねない (kanenai)',
        back: '有可能……，恐怕会……（表示担心某种不好的结果发生）\n接続：動詞マス形＋かねない',
        examples: [
          'このまま睡眠不足が続けば、病気になりかねない。',
          '不注意な発言は誤解を招きかねない。'
        ],
        language: 'ja',
        tags: ['JLPT N2', '文法']
      }
    ],
    quizQuestions: [
      {
        question: '「彼の不吉な予告は現実になり（　　）。」に最も適するものは？',
        options: ['かねない', 'っこない', 'を得ない', 'きれない'],
        correctIndex: 0,
        explanation: '「～かねない」表示“有可能导致不好事情发生”。句意为：他不幸的预言有可能会变成现实。'
      }
    ]
  }
];

export const INITIAL_TASKS: StudyTask[] = [
  // Grade 7 / 初一 Tasks
  {
    id: 'task-chu1-1',
    planId: 'plan-chu1-1',
    title: '初一数学：有理数与数轴点的位置判定',
    description: '复习正负数概念、相反数与数轴图解关系，练习去绝对值符号三步法。',
    subject: '数学',
    gradeLevel: '初一',
    category: 'math',
    durationMinutes: 25,
    taskType: 'concept',
    difficulty: 'easy',
    dueDate: new Date().toISOString().split('T')[0],
    completed: true,
    completedAt: new Date().toISOString(),
    keyPoints: ['数轴三要素', '绝对值几何意义', '相反数特征']
  },
  {
    id: 'task-chu1-2',
    planId: 'plan-chu1-1',
    title: '初一数学：一元一次方程移项与应用演练',
    description: '掌握含括号与分母的一元一次方程求解步骤，理解工程与行程问题等量关系。',
    subject: '数学',
    gradeLevel: '初一',
    category: 'math',
    durationMinutes: 30,
    taskType: 'practice',
    difficulty: 'medium',
    dueDate: new Date().toISOString().split('T')[0],
    completed: false,
    keyPoints: ['移项变号', '去分母法则', '实际应用等量方程']
  },
  {
    id: 'task-chu1-3',
    title: 'Grade 7 English: Key Academic Vocab & Sentence Drill',
    description: 'Master core vocabulary, grammar patterns, and daily conversational phrases for Grade 7.',
    subject: '英语',
    gradeLevel: '初一',
    category: 'language',
    durationMinutes: 20,
    taskType: 'flashcard',
    difficulty: 'easy',
    dueDate: new Date().toISOString().split('T')[0],
    completed: false,
    keyPoints: ['Grammar Patterns', 'Vocabulary Flashcards', 'Listening Pronunciation']
  },

  // High School / 高中 Tasks
  {
    id: 'task-1',
    planId: 'plan-physics-1',
    title: '受力分析与牛顿第二定律深度复习',
    description: '系统梳理重力、弹力、摩擦力的受力分析步骤，练习整体法与隔离法。',
    subject: '物理',
    gradeLevel: '高一',
    category: 'science',
    durationMinutes: 30,
    taskType: 'concept',
    difficulty: 'medium',
    dueDate: new Date().toISOString().split('T')[0],
    completed: true,
    completedAt: new Date().toISOString(),
    keyPoints: ['受力分析四步法', '正交分解法', '超重与失重特征']
  },
  {
    id: 'task-2',
    planId: 'plan-physics-1',
    title: '力学公式知识卡片记忆与默写',
    description: '复习力学核心公式与适用条件（如 F=ma, f=μN）。',
    subject: '物理',
    gradeLevel: '高二',
    category: 'science',
    durationMinutes: 20,
    taskType: 'flashcard',
    difficulty: 'easy',
    dueDate: new Date().toISOString().split('T')[0],
    completed: false,
    keyPoints: ['公式矢量性', '静摩擦力最大值求解']
  },
  {
    id: 'task-3',
    planId: 'plan-ielts-1',
    title: 'Master 10 High-Frequency Academic Verbs',
    description: 'Learn terms like "substantiate", "exacerbate", "facilitate", "advocate", and "mitigate".',
    subject: '英语雅思',
    category: 'language',
    durationMinutes: 25,
    taskType: 'flashcard',
    difficulty: 'medium',
    dueDate: new Date().toISOString().split('T')[0],
    completed: false,
    keyPoints: ['Usage in Task 2 essays', 'Synonyms and collocations']
  },
  {
    id: 'task-4',
    planId: 'plan-jlpt-1',
    title: 'N2 核心句型 5 选：心理与意志表达',
    description: '复习「～ざるを得ない」「～かねない」「～っこない」的接续与含义。',
    subject: '日语 N2',
    category: 'language',
    durationMinutes: 25,
    taskType: 'concept',
    difficulty: 'medium',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    completed: false,
    keyPoints: ['动词否定形+ざるを得ない', 'かねない (有可能导致坏结果)']
  }
];

export const INITIAL_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-chu1-eng-1',
    subject: '英语',
    language: 'en',
    front: 'favorite',
    phonetic: '/ˈfeɪvərɪt/',
    back: 'adj. 最喜爱的；n. 最喜爱的人或物\n用法：one\'s favorite subject (某人最喜欢的科目)',
    examples: [
      'My favorite subject is English because it is interesting.',
      'Which sport is your favorite?'
    ],
    tags: ['初一', '英语', '七年级核心词汇'],
    intervalDays: 1,
    easeFactor: 2.5,
    repetitions: 1,
    nextReviewDate: new Date().toISOString().split('T')[0],
    masteryLevel: 45
  },
  {
    id: 'fc-chu1-eng-2',
    subject: '英语',
    language: 'en',
    front: 'schedule',
    phonetic: '/ˈskedʒuːl/',
    back: 'n. 日程安排，时间表；v. 安排\n搭配：a busy schedule (忙碌的日程)',
    examples: [
      'I have a busy schedule on Monday and Wednesday.'
    ],
    tags: ['初一', '英语', '七年级核心词汇'],
    intervalDays: 2,
    easeFactor: 2.5,
    repetitions: 1,
    nextReviewDate: new Date().toISOString().split('T')[0],
    masteryLevel: 50
  },
  {
    id: 'fc-chu1-eng-3',
    subject: '英语',
    language: 'en',
    front: 'instrument',
    phonetic: '/ˈɪnstrəmənt/',
    back: 'n. 乐器；器械，仪器\n搭配：play a musical instrument (演奏乐器)',
    examples: [
      'Can you play any musical instruments?'
    ],
    tags: ['初一', '英语', '俱乐部与爱好'],
    intervalDays: 3,
    easeFactor: 2.5,
    repetitions: 2,
    nextReviewDate: new Date().toISOString().split('T')[0],
    masteryLevel: 70
  },
  {
    id: 'fc-1',
    subject: '英语雅思',
    language: 'en',
    front: 'Mitigate',
    phonetic: '/ˈmɪtɪɡeɪt/',
    back: 'v. 使减轻，使缓和 (to make something less harmful, serious, or severe)',
    examples: [
      'Governments should take immediate measures to mitigate the environmental impact of industrial waste.',
      'Renewable energy can help mitigate climate change.'
    ],
    tags: ['IELTS', 'Vocabulary', 'Writing Task 2'],
    intervalDays: 1,
    easeFactor: 2.5,
    repetitions: 1,
    nextReviewDate: new Date().toISOString().split('T')[0],
    masteryLevel: 40
  },
  {
    id: 'fc-2',
    subject: '英语雅思',
    language: 'en',
    front: 'Exacerbate',
    phonetic: '/ɪɡˈzæsərbeɪt/',
    back: 'v. 使加剧，使恶化 (to make a problem, bad situation, or negative feeling worse)',
    examples: [
      'Heavy traffic congestion exacerbates urban air pollution.'
    ],
    tags: ['IELTS', 'Writing Task 2'],
    intervalDays: 3,
    easeFactor: 2.5,
    repetitions: 2,
    nextReviewDate: new Date().toISOString().split('T')[0],
    masteryLevel: 65
  },
  {
    id: 'fc-3',
    subject: '日语 N2',
    language: 'ja',
    front: '～ざるを得ない (zaru wo etanai)',
    back: '不得不……，不能不……（表达因客观状况无奈做出某行为）\n接続：動詞ナイ形＋ざるを得ない（する→せざるを得ない）',
    examples: [
      '台風が近づいているため、試合は延期せざるを得ない。',
      '理由を証明できない以上、謝罪せざるを得ない。'
    ],
    tags: ['JLPT N2', '文法'],
    intervalDays: 1,
    easeFactor: 2.5,
    repetitions: 0,
    nextReviewDate: new Date().toISOString().split('T')[0],
    masteryLevel: 20
  },
  {
    id: 'fc-4',
    subject: '高中物理',
    language: 'zh',
    front: '动量守恒定律的适用条件是什么？',
    back: '系统不受外力，或者所受合外力为零；或者外力远小于内力（如碰撞、爆炸）；或者某一方向上合外力为零。',
    examples: ['两滑块在光滑水平面相撞：合外力为零，动量守恒。'],
    tags: ['物理', '动量', '守恒定律'],
    intervalDays: 4,
    easeFactor: 2.6,
    repetitions: 3,
    nextReviewDate: new Date().toISOString().split('T')[0],
    masteryLevel: 85
  }
];

export const INITIAL_QUIZZES: QuizQuestion[] = [
  {
    id: 'quiz-chu1-eng-1',
    subject: '英语',
    question: '— What time _______ your mother usually get up in the morning?\n— She usually _______ up at 6:00 a.m.',
    options: ['does; gets', 'do; get', 'is; gets', 'does; get'],
    correctIndex: 0,
    explanation: '主语 your mother 是第三人称单数，疑问句助动词用 does；答句中主语 She 为单数，谓语动词 get 变三单 gets。选 A。'
  },
  {
    id: 'quiz-chu1-eng-2',
    subject: '英语',
    question: 'There _______ three apples and a bottle of milk on the dining table.',
    options: ['are', 'is', 'have', 'be'],
    correctIndex: 0,
    explanation: 'There be 句型遵循“就近原则”，紧邻 be 动词的名词 three apples 为复数，因此用 are。选 A。'
  },
  {
    id: 'quiz-1',
    subject: '高中物理',
    question: '一质量为 m 的小球以速度 v 垂直撞击墙壁后以原速率反弹，墙壁对小球的冲量大小为多少？',
    options: ['0', 'mv', '2mv', '0.5mv'],
    correctIndex: 2,
    explanation: '取反弹方向为正方向，初速度为 -v，末速度为 v。冲量 I = Δp = m*v - m*(-v) = 2mv。'
  },
  {
    id: 'quiz-2',
    subject: '英语雅思',
    question: 'Choose the best synonym for "mitigate" in the sentence: "Policies were implemented to mitigate risks."',
    options: ['Increase', 'Alleviate', 'Ignore', 'Complicate'],
    correctIndex: 1,
    explanation: '"Mitigate" means to alleviate, reduce, or lessen the severity of something.'
  },
  {
    id: 'quiz-3',
    subject: '日语 N2',
    question: '「彼の不吉な予告は現実になり（　　）。」に最も適するものは？',
    options: ['かねない', 'っこない', 'を得ない', 'きれない'],
    correctIndex: 0,
    explanation: '「～かねない」表示“有可能导致不好事情发生”。句意为：他不幸的预言有可能会变成现实。'
  }
];

export const INITIAL_QUESTION_BANK: QuestionBankItem[] = [
  {
    id: 'qb-chu1-eng-1',
    subject: '英语',
    gradeStage: '初中',
    gradeLevel: '初一',
    topic: '一般现在时动词三单与频度副词',
    question: 'Tony usually _______ (walk) to school, but sometimes he _______ (ride) his bike.',
    options: ['walks; rides', 'walk; ride', 'walks; ride', 'walk; rides'],
    correctIndex: 0,
    explanation: '【解析】主语 Tony 是第三人称单数，由 usually 和 sometimes 可知句子为一般现在时，两处动词均需用第三人称单数形式 walks 与 rides。选 A。',
    questionType: 'choice',
    difficulty: 'easy',
    keyPoints: ['七年级英语', '动词第三人称单数', '一般现在时标志词'],
    isSavedToMistakes: true
  },
  {
    id: 'qb-chu1-eng-2',
    subject: '英语',
    gradeStage: '初中',
    gradeLevel: '初一',
    topic: 'There be 句型与介词短语',
    question: '— Is there a library in your school?\n— Yes, _______. It\'s _______ the dining hall and the teaching building.',
    options: ['there is; between', 'it is; next', 'there is; under', 'there are; behind'],
    correctIndex: 0,
    explanation: '【解析】1. Is there...? 的肯定回答固定为 "Yes, there is."；2. 表示“在……和……之间”固定搭配为 "between A and B"。选 A。',
    questionType: 'choice',
    difficulty: 'medium',
    keyPoints: ['七年级英语', 'There be 句型简略回答', '介词 between...and...'],
    isSavedToMistakes: false
  },
  {
    id: 'qb-chu1-1',
    subject: '数学',
    gradeStage: '初中',
    gradeLevel: '初一',
    topic: '有理数与数轴绝对值化简',
    question: '已知有理数 a, b 在数轴上的对应点位置如图所示，a < 0 < b 且 |a| > |b|。化简 |a| - |b| + |a + b| 的结果是（ ）。',
    options: ['-2a', '2b', '-2b', '0'],
    correctIndex: 2,
    explanation: '【解析】因 a<0<b 且 |a|>|b|，可知 a+b < 0。因此 |a| = -a，|b| = b，|a+b| = -(a+b) = -a-b。原式 = (-a) - b + (-a-b) = -2a-2b。若求 |a| + |b| - |a+b|，则为 -a + b - (-a-b) = 2b。选 C。',
    questionType: 'choice',
    difficulty: 'medium',
    keyPoints: ['初一数学', '绝对值化简', '数轴与几何意义'],
    isSavedToMistakes: true
  },
  {
    id: 'qb-1',
    subject: '物理',
    gradeStage: '高中',
    gradeLevel: '高二',
    topic: '动量守恒与碰撞',
    question: '在光滑水平面上，质量为 m1=2kg 的木块以 v1=3m/s 的速度与静止的质量为 m2=1kg 的木块发生完全非弹性碰撞，碰撞后两木块粘在一起共同运动。求碰撞后的共同速度 v 及系统的机械能损失 ΔE。',
    options: [
      'v = 2m/s，ΔE = 3J',
      'v = 1.5m/s，ΔE = 4J',
      'v = 2m/s，ΔE = 6J',
      'v = 3m/s，ΔE = 0J'
    ],
    correctIndex: 0,
    explanation: '【解析】1. 动量守恒：m1*v1 = (m1+m2)*v => 2*3 = (2+1)*v => v = 2m/s。\n2. 碰撞前总动能 Ek1 = 0.5*m1*v1^2 = 0.5*2*9 = 9J。\n3. 碰撞后总动能 Ek2 = 0.5*(m1+m2)*v^2 = 0.5*3*4 = 6J。\n4. 机械能损失 ΔE = Ek1 - Ek2 = 9J - 6J = 3J。选 A。',
    questionType: 'choice',
    difficulty: 'medium',
    keyPoints: ['动量守恒定律', '完全非弹性碰撞', '机械能损失计算'],
    isSavedToMistakes: true
  },
  {
    id: 'qb-2',
    subject: '数学',
    gradeStage: '初中',
    gradeLevel: '初三/中考',
    topic: '二次函数图像与性质',
    question: '已知二次函数 y = a*x^2 + b*x + c (a≠0) 的图像开口向上，对称轴为直线 x = 1，且经过点 (-1, 0)。下列结论中：① b < 0；② 2a + b = 0；③ a - b + c = 0；④ 4a + 2b + c > 0。正确的有几个？',
    options: ['1个', '2个', '3个', '4个'],
    correctIndex: 2,
    explanation: '【解析】1. 开口向上 => a > 0；对称轴 x = -b/(2a) = 1 => b = -2a < 0 => ①正确，②2a+b=0正确；\n2. 图像过 (-1,0) => a*(-1)^2 + b*(-1) + c = 0 => a - b + c = 0 => ③正确；\n3. 对称轴为 x=1，点 (-1,0) 关于 x=1 对称点为 (3,0)，故当 x=2 时位于轴下方 y < 0，即 4a+2b+c < 0 => ④错误。\n综上正确的有①②③共 3 个。选 C。',
    questionType: 'choice',
    difficulty: 'hard',
    keyPoints: ['二次函数对称轴', '系数与图像判定', '中考压轴选择题'],
    isSavedToMistakes: false
  },
  {
    id: 'qb-3',
    subject: '化学',
    gradeStage: '高中',
    gradeLevel: '高一',
    topic: '氧化还原反应与电子转移',
    question: '在反应 2KMnO4 + 16HCl(浓) = 2KCl + 2MnCl2 + 5Cl2↑ + 8H2O 中，氧化剂与还原剂的物质的量之比为多少？当生成 5mol Cl2 时，转移的电子数为多少？',
    options: [
      '1 : 5，转移 10mol 电子',
      '1 : 8，转移 10mol 电子',
      '1 : 5，转移 5mol 电子',
      '2 : 16，转移 16mol 电子'
    ],
    correctIndex: 0,
    explanation: '【解析】1. KMnO4 中 Mn 从 +7 降至 +2 (做氧化剂)，16 个 HCl 中有 10 个 Cl- 被氧化成 Cl2 (做还原剂)，另外 6 个做酸。故氧化剂 : 还原剂 = 2 : 10 = 1 : 5。\n2. 生成 5mol Cl2 (10个 Cl 原子，从 -1 升至 0)，共失 10mol e-，故转移电子 10mol。选 A。',
    questionType: 'choice',
    difficulty: 'medium',
    keyPoints: ['氧化剂与还原剂', '电子转移守恒', '高考化学必考基础'],
    isSavedToMistakes: false
  },
  {
    id: 'qb-4',
    subject: '英语',
    gradeStage: '初中',
    gradeLevel: '初二',
    topic: '现在完成时与过去完成时辨析',
    question: 'Fill in the blank: "I _______ (study) English for three years, and I can now talk with foreigners fluently."',
    correctAnswerText: 'have studied',
    explanation: '【解析】句子表达从过去三年前开始一直持续到现在且对现在产生影响的动作，动词用现在完成时（have/has + 过去分词）。主语为 I，填 have studied。',
    questionType: 'fill',
    difficulty: 'easy',
    keyPoints: ['现在完成时结构', 'for + 时间段', '中考高频语法'],
    isSavedToMistakes: true
  },
  {
    id: 'qb-5',
    subject: '数学',
    gradeStage: '高中',
    gradeLevel: '高一',
    topic: '函数的单调性与奇偶性',
    question: '已知 f(x) 为 R 上的奇函数，且当 x > 0 时，f(x) = x^2 - 2x。求 f(x) 在 R 上的解析式并求出 f(-3) 的值。',
    correctAnswerText: '当 x < 0 时，f(x) = -x^2 - 2x；f(-3) = -3',
    explanation: '【解析】1. 因为 f(x) 是奇函数，定义域为 R，所以 f(0) = 0。\n2. 设 x < 0，则 -x > 0，代入已知解析式得：f(-x) = (-x)^2 - 2(-x) = x^2 + 2x。\n3. 由奇函数性质 f(-x) = -f(x)，得 -f(x) = x^2 + 2x => f(x) = -x^2 - 2x (x < 0)。\n4. 计算 f(-3)：利用 f(-3) = -f(3) = -(3^2 - 2*3) = -3。',
    questionType: 'solution',
    difficulty: 'medium',
    keyPoints: ['奇函数性质', '区间转化法求解析式', '高考函数核心突破'],
    isSavedToMistakes: false
  },
  {
    id: 'qb-6',
    subject: '生物',
    gradeStage: '高中',
    gradeLevel: '高一',
    topic: '光合作用与细胞呼吸',
    question: '在光照条件下，植物叶肉细胞中能够产生 ATP 的结构有：①细胞质基质；②线粒体基质；③线粒体内膜；④叶绿体类囊体薄膜；⑤叶绿体基质。下列选项正确的是？',
    options: ['①②③④', '①②③⑤', '②③④⑤', '①③④⑤'],
    correctIndex: 0,
    explanation: '【解析】1. 有氧呼吸三个阶段：第一阶段在细胞质基质(①)，第二阶段在线粒体基质(②)，第三阶段在线粒体内膜(③)，三者均产生 ATP。\n2. 光合作用光反应阶段在叶绿体类囊体薄膜(④)上产生 ATP；而叶绿体基质(⑤)是暗反应阶段，消耗 ATP，不产生 ATP。\n故正确选项为①②③④。选 A。',
    questionType: 'choice',
    difficulty: 'medium',
    keyPoints: ['光反应与暗反应', '有氧呼吸场所', 'ATP 产生途径'],
    isSavedToMistakes: false
  }
];

export const INITIAL_COURSE_PREVIEWS: CoursePreviewGuide[] = [
  {
    id: 'preview-english-chu1-simple-present',
    title: '七年级英语：《一般现在时与动词第三人称单数》新课预习案',
    titleEn: 'Grade 7 English: Simple Present Tense & 3rd Person Singular Pre-Class Guide',
    subject: '英语',
    gradeLevel: '初一',
    publisher: '人教版 (七年级上/下册)',
    overview: '一般现在时是初中英语最基础也是初一考试失分率最高的核心语法点。本预习案带你攻克动词第三人称单数 (3rd Person Singular) 的 4 大变形规律、助动词 do/does 的降维法则，以及日常情境问答表达。',
    overviewEn: 'The Simple Present Tense is the foundational pillar of Grade 7 English. Master 3rd person singular verb inflections, do/does auxiliary questions, and daily routine conversational patterns.',
    estimatedTimeMinutes: 15,
    learningObjectives: [
      '掌握一般现在时的两大核心用法：经常性动作/习惯与客观事实真理',
      '熟练运用动词第三人称单数 4 种变形规则（加-s、加-es、辅音+y变-ies、特殊have->has）',
      '掌握否定句 (don\'t / doesn\'t) 与一般疑问句 (Do / Does) 的句型转换与动词还原形规则',
      '能流利运用频度副词 (always, usually, often, sometimes, never) 描述个人日常作息'
    ],
    learningObjectivesEn: [
      'Understand recurring habits and general facts in the Simple Present Tense',
      'Master the 4 conjugation rules for 3rd person singular verbs (-s, -es, -ies, has)',
      'Construct negative sentences and questions using auxiliary verbs do/does with base form verbs',
      'Use frequency adverbs (always, usually, often, sometimes, never) to describe daily schedules'
    ],
    prerequisites: [
      'be 动词 (am, is, are) 的主谓搭配口诀：“我用 am，你用 are，is 连着他她它，单数 is 复数 are”',
      '人称代词主格（I, you, he, she, it, we, they）的基础含义'
    ],
    prerequisitesEn: [
      'Subject-verb agreement for the verb "to be" (am, is, are)',
      'Subject pronouns (I, you, he, she, it, we, they)'
    ],
    coreDefinitions: [
      {
        name: '一般现在时与频度时间标志词',
        nameEn: 'Simple Present Tense & Time Markers',
        explanation: '表示经常性、习惯性的动作或当前存在的状态。常见标志词：always (总是 100%), usually (通常 80%), often (经常 60%), sometimes (有时 40%), never (从不 0%), every day / on weekends。',
        explanationEn: 'Expresses habitual actions, general truths, or ongoing states. Common markers: always, usually, often, sometimes, never, every morning.',
        keyFormula: '主语 (I/We/You/They) + 动词原形 ; 主语 (He/She/It/单数名词) + 动词三单 (V-s/es)',
        keyFormulaEn: 'I/You/We/They + V(base) ; He/She/It + V(-s/-es)'
      },
      {
        name: '助动词 do/does “照妖镜”法则',
        nameEn: 'Auxiliary Verb Do/Does Base-Form Rule',
        explanation: '当句子变成否定句（加 don\'t / doesn\'t）或一般疑问句（句首加 Do / Does）时，助动词已经承担了单复数和时态，后面的谓语动词必须变回动词原形！',
        explanationEn: 'In negative sentences (don\'t/doesn\'t) and questions (Do/Does), the main verb always reverts to its base form.',
        keyFormula: 'Does + 主语(三单) + 动词原形...? ⟹ Yes, 主语+does. / No, 主语+doesn\'t.',
        keyFormulaEn: 'Does + Subject + V(base)...? ⟹ Yes, S+does. / No, S+doesn\'t.'
      }
    ],
    selfCheckQuiz: [
      {
        question: '— What does your father do on Saturday afternoons?\n— He usually _______ basketball with his friends.',
        questionEn: '— What does your father do on Saturday afternoons?\n— He usually _______ basketball with his friends.',
        options: ['play', 'plays', 'playing', 'to play'],
        optionsEn: ['play', 'plays', 'playing', 'to play'],
        correctIndex: 1,
        explanation: '答句主语 He 是第三人称单数，由 usually 可知句子是一般现在时，play 变三单 plays。选 B。',
        explanationEn: 'The subject "He" is third-person singular in the present simple tense with "usually", requiring the singular verb form "plays". Option B.'
      },
      {
        question: 'Mary doesn\'t _______ (like) carrots, but she _______ (eat) tomatoes every day.',
        questionEn: 'Mary doesn\'t _______ (like) carrots, but she _______ (eat) tomatoes every day.',
        options: ['likes; eats', 'like; eats', 'like; eat', 'likes; eat'],
        optionsEn: ['likes; eats', 'like; eats', 'like; eat', 'likes; eat'],
        correctIndex: 1,
        explanation: '前半句有助动词 doesn\'t，后面的 like 用原形；后半句主语 she 是第三人称单数肯定句，eat 变三单 eats。选 B。',
        explanationEn: 'After the negative auxiliary "doesn\'t", the verb must remain in base form "like". In the second clause, affirmative subject "she" takes "eats". Option B.'
      }
    ],
    questionsToAskTeacher: [
      '动词以辅音字母 + y 结尾变 ies（如 fly->flies, study->studies），如果以元音字母 + y 结尾（如 play, buy, stay）为什么直接加 s？',
      '在 There be 句型中，如果主语是并列名词（如 a pen and two rulers），应该用 There is 还是 There are？'
    ],
    questionsToAskTeacherEn: [
      'Why do verbs ending in vowel+y (play, buy) just take -s, while consonant+y (study) change to -ies?',
      'In "There be" sentences with multiple nouns (a pen and two rulers), how does the Proximity Rule determine is vs are?'
    ]
  },
  {
    id: 'preview-english-gaozhong-nonfinite',
    title: '高中英语：《非谓语动词与状语从句综合突破》新课预习案',
    titleEn: 'Senior High English: Non-Finite Verbs & Adverbial Clauses Pre-Class Guide',
    subject: '英语',
    gradeLevel: '高中 (高一/高二/高考)',
    publisher: '人教版 / 新课标高中英语',
    overview: '非谓语动词（不定式 to do、动名词/现在分词 doing、过去分词 done）是高中英语写作与长难句阅读的灵魂。本预习案带你攻克句子主干与非谓语修饰成分的判定逻辑。',
    overviewEn: 'Non-finite verbs (to do, doing, done) are the backbone of high school English reading comprehension and academic writing. This guide demystifies syntactic parsing and role determination.',
    estimatedTimeMinutes: 20,
    learningObjectives: [
      '准确区分句子中的谓语动词 (Predicate Verb) 与非谓语动词 (Non-Finite Verb)',
      '掌握 doing（主动/进行）与 done（被动/完成）作定语和状语的核心判断法则',
      '攻克高中完形填空与短文填空中非谓语变形高频易错点'
    ],
    learningObjectivesEn: [
      'Differentiate predicate verbs from non-finite verbs in complex sentences',
      'Master active vs passive logic for doing (active/ongoing) and done (passive/completed)',
      'Achieve high accuracy in cloze and grammatical filling sections'
    ],
    prerequisites: [
      '初中五大基本句型（S+V, S+V+O, S+V+P, S+V+O+OC, S+V+IO+DO）',
      '动词的过去式 (Past Tense) 与过去分词 (Past Participle) 规则与不规则变形'
    ],
    prerequisitesEn: [
      'Five basic English sentence patterns',
      'Regular and irregular verb past tense and past participle conjugations'
    ],
    coreDefinitions: [
      {
        name: '非谓语动词核心定义 (Non-Finite Verbs)',
        nameEn: 'Definition of Non-Finite Verbs',
        explanation: '在句子中充当除谓语以外的其他句子成分（主语、宾语、表语、定语、状语、补语）的动词形式，不受人称和数的人称限制。',
        explanationEn: 'Verb forms that do not act as the predicate of a clause, serving instead as nouns, adjectives, or adverbs.',
        keyFormula: 'To Do (目的/将来) | Doing (主动/进行) | Done (被动/完成)',
        keyFormulaEn: 'To Do (purpose/future) | Doing (active/in-progress) | Done (passive/completed)'
      },
      {
        name: '做定语/状语判定法则 (Logical Subject Test)',
        nameEn: 'Logical Subject Test',
        explanation: '找到非谓语动词的逻辑主语（修饰名词或主句主语）：若逻辑主语发出动作，用 doing；若逻辑主语承受动作，用 done。',
        explanationEn: 'Identify the logical subject: choose "doing" if the subject performs the action, or "done" if the subject undergoes the action.',
        keyFormula: '主动/进行 ⟹ doing ; 被动/完成 ⟹ done',
        keyFormulaEn: 'Active/Ongoing ⟹ doing ; Passive/Completed ⟹ done'
      }
    ],
    selfCheckQuiz: [
      {
        question: '_______ (hear) the exciting news, all the students jumped with joy.',
        questionEn: '_______ (hear) the exciting news, all the students jumped with joy.',
        options: ['Hear', 'Heard', 'Hearing', 'To hear'],
        optionsEn: ['Hear', 'Heard', 'Hearing', 'To hear'],
        correctIndex: 2,
        explanation: '句中谓语动词为 jumped，前面是非谓语作时间/原因状语。逻辑主语 all the students 与 hear 是主动关系，故用现在分词 Hearing。',
        explanationEn: 'The predicate verb is "jumped". The logical subject "all the students" actively performs the action "hear", requiring the present participle "Hearing".'
      },
      {
        question: 'The famous book _______ (write) by Mo Yan is popular among high school students.',
        questionEn: 'The famous book _______ (write) by Mo Yan is popular among high school students.',
        options: ['writing', 'written', 'wrote', 'to write'],
        optionsEn: ['writing', 'written', 'wrote', 'to write'],
        correctIndex: 1,
        explanation: 'The famous book 与 write 之间是被动完成关系，作定语修饰 book，填 written。',
        explanationEn: '"The famous book" receives the action of "write", requiring the past participle "written" as an adjective modifier.'
      }
    ],
    questionsToAskTeacher: [
      '非谓语动词的“完成式（having done / having been done）”在高考中一般有哪些典型标志词？',
      '如何快速区分现在分词作状语和独立主格结构？'
    ],
    questionsToAskTeacherEn: [
      'What are the typical context clues indicating the perfect form "having done"?',
      'How to distinguish absolute structures from participle adverbial clauses?'
    ]
  },
  {
    id: 'preview-english-chuzhong-tenses',
    title: '初中英语：《现在完成时与中考核心句型》新课预习案',
    titleEn: 'Junior High English: Present Perfect Tense Pre-Class Guide',
    subject: '英语',
    gradeLevel: '初中 (初二/初三)',
    publisher: '人教版 (Go for it!)',
    overview: '现在完成时是初中阶段最容易混淆的语法点。本预习案带你掌握 have/has + done 的两大核心考法：持续性与影响性，理清 have been to 与 have gone to 的区别。',
    overviewEn: 'Present perfect tense is the most crucial grammar topic in junior high. Master ongoing duration versus past impact, and clarify "have been to" vs "have gone to".',
    estimatedTimeMinutes: 15,
    learningObjectives: [
      '掌握现在完成时基本结构：have/has + 过去分词 (Past Participle)',
      '彻底分清 have been to（去过某地已回）与 have gone to（去某地未归）',
      '掌握 for + 时间段 与 since + 过去时间点的连用规则及延续性动词转化'
    ],
    learningObjectivesEn: [
      'Master the structure of Present Perfect: have/has + past participle',
      'Distinguish "have been to" (been and returned) from "have gone to" (left and not yet back)',
      'Learn the rules of using "for" and "since" with continuous action verbs'
    ],
    prerequisites: [
      '一般过去时态 (Past Simple) 的基本构成与标志词 (yesterday, last year, ago)',
      '常见常用动词的三态变化 (eat-ate-eaten, see-saw-seen)'
    ],
    prerequisitesEn: [
      'Past Simple structure and time markers',
      'Irregular verb past and past participle forms'
    ],
    coreDefinitions: [
      {
        name: '现在完成时两大核心用法',
        nameEn: 'Two Core Usages of Present Perfect',
        explanation: '1. 影响性：过去发生的动作对现在造成的结果或影响（标志词 already, yet, just）。2. 延续性：过去发生并一直持续到现在的动作（标志词 for 3 years, since 2020）。',
        explanationEn: '1. Impact: An action in the past having a result now. 2. Duration: An action that started in the past and continues into the present.',
        keyFormula: 'have/has + 过去分词 (V-ed/V-pp)',
        keyFormulaEn: 'have/has + Past Participle (p.p.)'
      },
      {
        name: 'have been to 与 have gone to 辨析',
        nameEn: 'Difference: Have Been To vs Have Gone To',
        explanation: 'have been to 表示“曾去过某地（现在人已经回来）”；have gone to 表示“去了某地（现在人还在那里或在路上）”。',
        explanationEn: '"Have been to" means visited and returned; "Have gone to" means went somewhere and has not returned.',
        keyFormula: 'have been to = 经历过已回 ; have gone to = 在途中/未归',
        keyFormulaEn: 'been to = returned ; gone to = away'
      }
    ],
    selfCheckQuiz: [
      {
        question: '— Where is Mr. Wang?\n— He _______ to Beijing on business and will come back next Monday.',
        questionEn: '— Where is Mr. Wang?\n— He _______ to Beijing on business and will come back next Monday.',
        options: ['has been', 'has gone', 'went', 'goes'],
        optionsEn: ['has been', 'has gone', 'went', 'goes'],
        correctIndex: 1,
        explanation: '由下句“下周一才回来”可知王老师去了北京还没回来，用 has gone to。选 B。',
        explanationEn: 'Since he "will come back next Monday", he is still in Beijing or on the way, requiring "has gone to".'
      }
    ],
    questionsToAskTeacher: [
      '短暂性动词（如 die, buy, join）在与 for/since 连用时，如何转换成延续性状态（如 be dead, have, be in/be a member of）？'
    ],
    questionsToAskTeacherEn: [
      'How do momentary verbs (like buy, die, join) convert into durative states when paired with for/since?'
    ]
  },
  {
    id: 'preview-math-chu1-equation',
    title: '初一数学：《一元一次方程及其应用》新课预习案',
    titleEn: 'Junior 1 Math: Linear Equations in One Variable Pre-Class Guide',
    subject: '数学',
    gradeLevel: '初一',
    publisher: '人教版 (七年级)',
    overview: '本预习案带你从算术思维跨越到代数思维，理解“用字母表示未知数”建立等量关系的威力，掌握移项与等式性质。',
    overviewEn: 'Bridge arithmetic into algebra by learning how variables establish equations and applying properties of equality.',
    estimatedTimeMinutes: 20,
    learningObjectives: [
      '理解一元一次方程的定义与标准形式 ax + b = 0 (a≠0)',
      '掌握等式的基本性质（加减乘除恒等变形）',
      '熟练运用“移项”变号法则解方程并检验解'
    ],
    learningObjectivesEn: [
      'Understand the definition and standard form of linear equations: ax + b = 0 (a ≠ 0)',
      'Master the basic properties of equality under algebraic operations',
      'Proficiently apply term transposing to solve and verify linear equations'
    ],
    prerequisites: [
      '用字母表示数与代数式合并同类项',
      '小学的方程初步与倒推算术方法'
    ],
    prerequisitesEn: [
      'Algebraic expressions and combining like terms',
      'Elementary equation foundations'
    ],
    coreDefinitions: [
      {
        name: '一元一次方程定义',
        nameEn: 'Linear Equation in One Variable',
        explanation: '只含有一个未知数（元），未知数的次数都是 1（次），等号两边都是整式的方程。',
        explanationEn: 'An equation containing only one unknown variable with an exponent of 1 where both sides are polynomial expressions.',
        keyFormula: 'ax + b = 0 (a ≠ 0)',
        keyFormulaEn: 'ax + b = 0 (a ≠ 0)'
      },
      {
        name: '等式基本性质 1 & 2',
        nameEn: 'Properties of Equality',
        explanation: '性质 1：等式两边加（或减）同一个数或同一个整式，结果仍相等。性质 2：等式两边乘同一个数，或除以同一个不为 0 的数，结果仍相等。',
        explanationEn: 'Adding, subtracting, multiplying, or dividing (non-zero) the same quantity on both sides preserves equality.',
        keyFormula: 'a = b ⟹ a ± c = b ± c ; a·c = b·c',
        keyFormulaEn: 'a = b ⟹ a ± c = b ± c ; a·c = b·c'
      },
      {
        name: '移项变号法则',
        nameEn: 'Transposition Rule',
        explanation: '把等式一边的某一项改变符号后移到另一边。',
        explanationEn: 'Moving a term across the equals sign flips its positive or negative sign.',
        keyFormula: '2x + 3 = 7 ⟹ 2x = 7 - 3 ⟹ x = 2',
        keyFormulaEn: '2x + 3 = 7 ⟹ 2x = 7 - 3 ⟹ x = 2'
      }
    ],
    selfCheckQuiz: [
      {
        question: '下列方程中属于一元一次方程的是（ ）。',
        questionEn: 'Which of the following is a linear equation in one variable?',
        options: ['x + 2y = 5', 'x^2 - 1 = 0', '3x - 1 = 5', '1/x = 2'],
        optionsEn: ['x + 2y = 5', 'x^2 - 1 = 0', '3x - 1 = 5', '1/x = 2'],
        correctIndex: 2,
        explanation: 'A 含两个未知数；B 最高次数为 2；D 是分式方程。只有 C 是一元一次方程。',
        explanationEn: 'A has two variables; B is quadratic; D is a fractional equation. Only C is linear in one variable.'
      }
    ],
    questionsToAskTeacher: [
      '移项时忘记变号是最容易扣分的地方，有没有什么顺口溜能帮助记忆？',
      '在列方程解应用题时，如何快速在题目中找到“等量关系”？'
    ],
    questionsToAskTeacherEn: [
      'How to effectively remember sign flipping when moving terms across the equals sign?',
      'What are the best strategies to identify equivalent relationships in word problems?'
    ]
  },
  {
    id: 'preview-physics-newton1',
    title: '初中物理：《牛顿第一定律与惯性》新课预习案',
    titleEn: 'Junior High Physics: Newton\'s First Law & Inertia Pre-Class Guide',
    subject: '物理',
    gradeLevel: '初中 (初二下)',
    publisher: '人教版',
    overview: '本预习案带你打破日常生活中的物理直觉误区，探究“力是不是维持物体运动的原因”，深刻理解牛顿第一定律与惯性现象。',
    overviewEn: 'Demystify intuitive misconceptions about mechanics and explore whether force is needed to maintain motion.',
    estimatedTimeMinutes: 20,
    learningObjectives: [
      '知道伽利略斜面实验的推理过程与科学方法',
      '理解牛顿第一定律（惯性定律）的准确表述与适用条件',
      '能够用“惯性”解释生活中的常见现象（如刹车前倾、甩干衣服）'
    ],
    learningObjectivesEn: [
      'Understand Galileo\'s inclined plane thought experiment',
      'Grasp Newton\'s First Law (Law of Inertia) conditions and definition',
      'Explain real-world inertia phenomena (sudden braking, centrifugal spin)'
    ],
    prerequisites: [
      '力的三要素（大小、方向、作用点）与力的作用效果（改变物体的运动状态或形状）',
      '二力平衡条件（同物、等大、反向、共线）'
    ],
    prerequisitesEn: [
      'Three elements of force (magnitude, direction, point of action)',
      'Balanced forces equilibrium conditions'
    ],
    coreDefinitions: [
      {
        name: '伽利略理想斜面实验',
        nameEn: 'Galileo\'s Ideal Inclined Plane Experiment',
        explanation: '让小车从同一斜面同一高度静止滑下，表面越光滑，受到的阻力越小，小车运动的距离越远。推理：若阻力为零，小车将永远做匀速直线运动。',
        explanationEn: 'A cart rolling down an incline goes further on smoother surfaces. Deduce: with zero resistance, it moves forever at constant velocity.',
        keyFormula: '科学推理法 (理想化思维模型)',
        keyFormulaEn: 'Scientific Deduction & Ideal Thought Experiment'
      },
      {
        name: '牛顿第一定律 (惯性定律)',
        nameEn: 'Newton\'s First Law of Motion',
        explanation: '一切物体在没有受到力的作用时，总保持静止状态或匀速直线运动状态。',
        explanationEn: 'An object remains at rest or in uniform motion in a straight line unless acted upon by a net external force.',
        keyFormula: 'F合 = 0 ⟹ 静止 或 匀速直线运动',
        keyFormulaEn: 'F_net = 0 ⟹ Rest or Constant Velocity'
      },
      {
        name: '惯性 (Inertia)',
        nameEn: 'Inertia',
        explanation: '物体保持原有运动状态不变的属性。一切物体在任何情况下都具有惯性，质量是惯性大小的唯一量度。',
        explanationEn: 'The resistance of any physical object to any change in its velocity. Mass is the sole measure of inertia.',
        keyFormula: '质量越大 ⟹ 惯性越大 ⟹ 运动状态越难改变',
        keyFormulaEn: 'Greater Mass ⟹ Greater Inertia ⟹ Harder to Alter Motion'
      }
    ],
    selfCheckQuiz: [
      {
        question: '一正在空中飞行的足球，若突然失去一切外力作用，它将（ ）。',
        questionEn: 'A soccer ball moving in the air would _______ if all external forces suddenly disappeared.',
        options: ['立即停在空中', '垂直掉落到地面', '做匀速直线运动', '减速运动直到停止'],
        optionsEn: ['Stop immediately in the air', 'Fall vertically to the ground', 'Move in uniform straight-line motion', 'Decelerate until it stops'],
        correctIndex: 2,
        explanation: '根据牛顿第一定律，原来运动的物体在不受外力时将保持匀速直线运动状态。',
        explanationEn: 'By Newton\'s First Law, an object in motion continues in uniform straight-line motion when net external force is zero.'
      },
      {
        question: '关于惯性，下列说法正确的是（ ）。',
        questionEn: 'Which statement regarding inertia is correct?',
        options: [
          '静止的物体没有惯性',
          '物体速度越大，惯性越大',
          '物体不受力时才有惯性',
          '汽车质量越大，惯性越大，越难刹车'
        ],
        optionsEn: [
          'Stationary objects have no inertia',
          'Higher velocity means greater inertia',
          'Objects only have inertia when no force acts',
          'Greater car mass means greater inertia and harder braking'
        ],
        correctIndex: 3,
        explanation: '质量是惯性大小的唯一决定因素。任何物体任何状态下均有惯性。',
        explanationEn: 'Mass is the sole determining factor of inertia. All physical objects possess inertia at all times.'
      }
    ],
    questionsToAskTeacher: [
      '既然牛顿第一定律是在理想状况下（不受外力）成立的，我们生活中受力的物体是如何表现出匀速运动的？',
      '惯性是一种力吗？为什么不能说“受到了惯性的作用”？'
    ],
    questionsToAskTeacherEn: [
      'How does uniform motion manifest in the real world when balanced forces act on an object?',
      'Why is inertia a property rather than a force?'
    ]
  },
  {
    id: 'preview-math-function-monotone',
    title: '高中数学：《函数的单调性与最大(小)值》新课预习案',
    titleEn: 'Senior High Math: Function Monotonicity & Extrema Pre-Class Guide',
    subject: '数学',
    gradeLevel: '高中 (高一上)',
    publisher: '人教 A 版',
    overview: '函数的单调性是函数性质研究的核心。本预习案带你从“图像的升降”过渡到用严密的“代数定义 ($f(x_1) < f(x_2)$)”来证明单调性。',
    overviewEn: 'Function monotonicity is the core of function properties. Shift from geometric visual intuition to rigorous algebraic proofs.',
    estimatedTimeMinutes: 25,
    learningObjectives: [
      '从图像直观理解函数的增减变化，掌握增函数与减函数的图象特征',
      '掌握用定义法证明函数单调性的标准四步法（作差法）',
      '学会利用单调性求函数在闭区间上的最大值与最小值'
    ],
    learningObjectivesEn: [
      'Understand increasing/decreasing functions geometrically and algebraically',
      'Master the standard 4-step difference method for proving monotonicity',
      'Utilize monotonicity to find maximum and minimum values on closed intervals'
    ],
    prerequisites: [
      '初中一次函数、二次函数的图像与性质',
      '不等式的性质与因式分解（特别是平方差与作差比较大小）'
    ],
    prerequisitesEn: [
      'Linear and quadratic function graphs and features',
      'Inequalities and factorization techniques'
    ],
    coreDefinitions: [
      {
        name: '增函数 (Increasing Function) 代数定义',
        nameEn: 'Algebraic Definition of Increasing Function',
        explanation: '设函数 f(x) 在区间 D 上，对于任意的 x1, x2 ∈ D，当 x1 < x2 时，都有 f(x1) < f(x2)，则称 f(x) 在 D 上是增函数。',
        explanationEn: 'For any x1, x2 in domain D with x1 < x2, if f(x1) < f(x2), f(x) is strictly increasing on D.',
        keyFormula: '(x1 - x2)[f(x1) - f(x2)] > 0',
        keyFormulaEn: '(x1 - x2)[f(x1) - f(x2)] > 0'
      },
      {
        name: '定义法证明单调性四步法',
        nameEn: '4-Step Monotonicity Proof',
        explanation: '1. 取值：任取 x1, x2 ∈ D，且 x1 < x2；\n2. 作差：计算 f(x1) - f(x2)；\n3. 变形：因式分解或配方；\n4. 定号：判断差值符号并下结论。',
        explanationEn: '1. Choose: pick x1 < x2 in domain; 2. Subtract: f(x1) - f(x2); 3. Factorize; 4. Determine sign.',
        keyFormula: '取值 ⟹ 作差 ⟹ 变形 ⟹ 定号',
        keyFormulaEn: 'Choose ⟹ Subtract ⟹ Factorize ⟹ Determine Sign'
      }
    ],
    selfCheckQuiz: [
      {
        question: '已知函数 f(x) = -x^2 + 2x，在区间 (-∞, 1] 上 f(x) 是（ ）。',
        questionEn: 'For f(x) = -x^2 + 2x, on the interval (-∞, 1], f(x) is ( ).',
        options: ['增函数', '减函数', '先增后减', '常数函数'],
        optionsEn: ['Increasing', 'Decreasing', 'Increasing then decreasing', 'Constant'],
        correctIndex: 0,
        explanation: '二次函数对称轴为 x = 1，开口向下，在对称轴左侧 (-∞, 1] 上递增。',
        explanationEn: 'The axis of symmetry is x = 1 and the parabola opens downward, meaning it increases on (-∞, 1].'
      }
    ],
    questionsToAskTeacher: [
      '在写函数的单调递增区间时，为什么两个独立的递增区间中间不能用“∪”（并集符号）连接，而要用“和”或逗号隔开？',
      '除了作差法之外，未来我们在导数中将如何更快速地判断单调性？'
    ],
    questionsToAskTeacherEn: [
      'Why shouldn\'t union symbols (∪) be used between disjoint monotonic intervals?',
      'How does calculus/derivatives streamline monotonicity proofs in higher grades?'
    ]
  }
];

export const INITIAL_CLASSROOM_LESSONS: ClassroomLesson[] = [
  {
    id: 'lesson-english-chu1-simple-present',
    subject: '英语',
    topic: '七年级英语核心语法：一般现在时、动词三单变形与日常交际',
    topicEn: 'Grade 7 English: Simple Present Tense & 3rd Person Singular Masterclass',
    gradeLevel: '初一',
    semester: '上学期',
    countryRegion: '中国大陆',
    educationSystem: '人教版 (七年级新目标 Go for it!)',
    teacherName: '智学名师 · Emily 老师',
    teacherNameEn: 'Master Teacher · Emily',
    lectureTitle: '初一英语名师讲堂：一般现在时、动词三单规律与日常会话突破',
    lectureTitleEn: 'Grade 7 English Masterclass: Simple Present Tense, Verb Inflections & Daily Dialogues',
    objective: '全面掌握一般现在时的核心含义、频度标志词，熟练运用动词第三人称单数 4 大变化法则与助动词 do/does 疑问否定转换。',
    objectiveEn: 'Master Simple Present tense, frequency adverbs, 4 third-person singular conjugation rules, and do/does auxiliary questions.',
    lectureSections: [
      {
        sectionTitle: '一、场景导入：什么是“一般现在时”？频度副词大揭秘',
        sectionTitleEn: 'Section 1: What is the Simple Present Tense & Frequency Adverbs',
        objective: '理解一般现在时的核心概念及 5 大频度标志词',
        objectiveEn: 'Understand the concept of Simple Present Tense and frequency adverbs',
        content: '### 一般现在时两大核心语境\n1. **经常性、习惯性的动作**：例如每天早起（*I get up at 6:30 every day.*）、每周打篮球。\n2. **客观事实与真理**：例如太阳从东方升起（*The sun rises in the east.*）。\n\n### 频度副词“五兄弟”\n- **always (100%)**：总是，一直 ⟹ *She always helps her classmates.*\n- **usually (80%)**：通常 ⟹ *He usually rides his bike to school.*\n- **often (60%)**：经常 ⟹ *We often read books in the library.*\n- **sometimes (40%)**：有时 ⟹ *Sometimes I watch TV after dinner.*\n- **never (0%)**：从不 ⟹ *They never arrive late for class.*',
        contentEn: '### Two Core Usages of Simple Present Tense\n1. **Habitual actions**: Daily routines (e.g., *I get up at 6:30 every day*).\n2. **General truths and objective facts**: (*The sun rises in the east*).\n\n### Frequency Adverbs Scale\n- **always (100%)**: all the time\n- **usually (80%)**: standard routine\n- **often (60%)**: frequent occurrence\n- **sometimes (40%)**: occasional occurrence\n- **never (0%)**: zero occurrence',
        keyTakeaway: '看见 always, usually, often, every day 就要立刻联想到【一般现在时】！',
        keyTakeawayEn: 'Time markers like always, usually, often, and every day signal the Simple Present Tense!',
        checkpoint: {
          question: '下列句子中表示客观真理或经常性习惯、应使用一般现在时的是：',
          questionEn: 'Which sentence describes a general habit or truth requiring Simple Present Tense?',
          options: [
            'A. Light travels faster than sound.',
            'B. I bought a new bicycle yesterday.',
            'C. He will visit Beijing next month.',
            'D. They were having dinner when I arrived.'
          ],
          optionsEn: [
            'A. Light travels faster than sound.',
            'B. I bought a new bicycle yesterday.',
            'C. He will visit Beijing next month.',
            'D. They were having dinner when I arrived.'
          ],
          correctIndex: 0,
          explanation: '“光速比声速快”是客观科学真理，必须使用一般现在时（主语 Light 为不可数单数，动词 travel 变三单 travels）。选 A。',
          explanationEn: '"Light travels faster than sound" is a scientific truth, strictly requiring the Simple Present Tense with the third-person singular "travels". Option A.'
        }
      },
      {
        sectionTitle: '二、核心口诀与实战：动词第三人称单数 (3rd Person Singular) 4 大变化法则',
        sectionTitleEn: 'Section 2: 4 Rules of 3rd Person Singular Verb Inflections',
        objective: '掌握实义动词变为第三人称单数的规则与发音',
        objectiveEn: 'Master verb conjugations for third-person singular subjects',
        content: '### 主语是“他、她、它、单数名词”时，动词要变身！\n1. **一般情况直接加 -s**：\n   - *work ⟹ works*；*play ⟹ plays*；*read ⟹ reads*\n2. **以 s, x, ch, sh, o 结尾加 -es**（口诀：“吃西瓜(ch,sh,x,s)噢(o)加 -es”）：\n   - *teach ⟹ teaches*；*watch ⟹ watches*；*wash ⟹ washes*；*pass ⟹ passes*；*go ⟹ goes*；*do ⟹ does*\n3. **辅音字母 + y 结尾，变 y 为 i 再加 -es**：\n   - *study ⟹ studies*；*fly ⟹ flies*；*carry ⟹ carries*（注意：元音+y直接加s，如 *play ⟹ plays*）\n4. **特殊不规则变形**：\n   - *have ⟹ has*；*be ⟹ is*',
        contentEn: '### When Subject is He, She, It, or Singular Noun, Conjugate the Verb!\n1. **General rule (+s)**: *work ⟹ works*, *read ⟹ reads*, *play ⟹ plays*.\n2. **Ending in s, x, ch, sh, o (+es)**: *watch ⟹ watches*, *wash ⟹ washes*, *go ⟹ goes*, *do ⟹ does*.\n3. **Consonant + y (change y to i + es)**: *study ⟹ studies*, *fly ⟹ flies* (Contrast: vowel+y *play ⟹ plays*).\n4. **Irregular**: *have ⟹ has*, *be ⟹ is*.',
        keyTakeaway: '动词三单口诀：“吃西瓜噢加 -es，辅音加 y 变 ies，特殊 have 变 has，其余直接加个 s”！',
        keyTakeawayEn: 'Mnemonic: Add -es after s/x/ch/sh/o; turn consonant+y into -ies; change have into has; add -s for others!',
        checkpoint: {
          question: '请选出下列动词第三人称单数变化全部正确的一组：',
          questionEn: 'Which group contains all correct third-person singular forms?',
          options: [
            'A. study->studys, watch->watches, have->haves',
            'B. study->studies, watch->watches, have->has',
            'C. study->studies, watch->watchs, have->has',
            'D. study->studyes, watch->watches, have->has'
          ],
          optionsEn: [
            'A. study->studys, watch->watches, have->haves',
            'B. study->studies, watch->watches, have->has',
            'C. study->studies, watch->watchs, have->has',
            'D. study->studyes, watch->watches, have->has'
          ],
          correctIndex: 1,
          explanation: 'study 以辅音字母+y结尾，变 y 为 i 加 es (studies)；watch 以 ch 结尾加 es (watches)；have 为特殊不规则变形 (has)。选 B。',
          explanationEn: 'study ⟹ studies (consonant+y to -ies); watch ⟹ watches (+es); have ⟹ has (irregular). Option B.'
        }
      },
      {
        sectionTitle: '三、助动词 do / does 疑问与否定句转换的“打回原形”法则',
        sectionTitleEn: 'Section 3: Auxiliary Do/Does Question & Negative Transformation',
        objective: '掌握助动词 do/does 的用法及动词原形恢复原则',
        objectiveEn: 'Master questions and negatives with auxiliary verbs and base verbs',
        content: '### 助动词就像“照妖镜”！\n- **陈述句**：*He likes apples.*\n- **否定句（借助 doesn\'t）**：*He doesn\'t **like** apples.*（注意：likes 变回原形 like！）\n- **一般疑问句（句首加 Does）**：*Does he **like** apples?*\n  - **肯定回答**：*Yes, he does.*\n  - **否定回答**：*No, he doesn\'t.*\n\n### 易错陷阱警示\n⚠️ 很多同学容易写成：*Does he likes apples?*（❌ 错误！一个句子里助动词 does 已经体现了三单，后面的动词必须**还原成原形**！）',
        contentEn: '### The Base-Form Golden Rule!\n- **Affirmative**: *He likes apples.*\n- **Negative (with doesn\'t)**: *He doesn\'t **like** apples.* (Verb reverts to base form!)\n- **Interrogative (with Does)**: *Does he **like** apples?*\n  - **Yes**: *Yes, he does.*\n  - **No**: *No, he doesn\'t.*\n\n### Trap Alert\n⚠️ Never write *Does he likes...?* Because "does" already handles the singular third-person, the main verb MUST revert to its base form!',
        keyTakeaway: '句中一旦出现 does / doesn\'t，后面的实义动词必须【立刻打回原形】！',
        keyTakeawayEn: 'Once does or doesn\'t appears in a clause, the main verb immediately reverts to base form!',
        checkpoint: {
          question: '— _______ your sister often _______ her bedroom on Sundays?\n— Yes, she does.',
          questionEn: '— _______ your sister often _______ her bedroom on Sundays?\n— Yes, she does.',
          options: [
            'A. Do; cleans',
            'B. Does; clean',
            'C. Does; cleans',
            'D. Is; clean'
          ],
          optionsEn: [
            'A. Do; cleans',
            'B. Does; clean',
            'C. Does; cleans',
            'D. Is; clean'
          ],
          correctIndex: 1,
          explanation: '主语 your sister 是第三人称单数，一般疑问句助动词用 Does；助动词后谓语动词用原形 clean。选 B。',
          explanationEn: 'The subject "your sister" is singular, so the question begins with "Does", followed by the base-form verb "clean". Option B.'
        }
      }
    ],
    simplifiedExplanation: '我们可以把动词的第三人称单数想象成“穿上带 s 的红马甲”：平时主语是 I, you, we, they 时，动词穿平民装（原形）；一旦碰到 he, she, it 这种大人物，动词就要穿上带 s 的红马甲（如 likes, plays）！而当警卫员 does/doesn\'t 出来巡逻时，动词就把马甲脱掉交给他，自己变回平民原形！',
    simplifiedExplanationEn: 'Think of 3rd person singular as putting on a special "S-jacket": when the subject is he/she/it, the verb wears the S-jacket (likes, plays). But when the bodyguard "does/doesn\'t" arrives, the verb takes off the jacket and reverts to its comfortable base form!',
    checkQuestionPrompt: '同学们，关于“动词三单 4 大变化法则”与“助动词 does 后动词打回原形”，你全部听懂了吗？',
    checkQuestionPromptEn: 'Students, did you understand the 4 verb conjugation rules and the base-form reversion rule after "does"?',
    homeworkQuiz: [
      {
        id: 'hw-chu1-eng-1',
        subject: '英语',
        gradeStage: '初中',
        gradeLevel: '初一',
        topic: '一般现在时动词单复数',
        topicEn: 'Simple Present Subject-Verb Agreement',
        question: 'Tom usually _______ (walk) to school, but his twin brothers always _______ (ride) bikes.',
        questionEn: 'Tom usually _______ (walk) to school, but his twin brothers always _______ (ride) bikes.',
        options: ['walks; ride', 'walk; rides', 'walks; rides', 'walk; ride'],
        optionsEn: ['walks; ride', 'walk; rides', 'walks; rides', 'walk; ride'],
        correctIndex: 0,
        explanation: 'Tom 是第三人称单数，动词 walk 变三单 walks；his twin brothers 是复数主语，动词用原形 ride。选 A。',
        explanationEn: 'Tom is singular, taking "walks". "his twin brothers" is plural, taking the base form "ride". Option A.',
        questionType: 'choice',
        difficulty: 'easy',
        keyPoints: ['主谓一致', '一般现在时动词三单']
      },
      {
        id: 'hw-chu1-eng-2',
        subject: '英语',
        gradeStage: '初中',
        gradeLevel: '初一',
        topic: 'There be 句型与就近原则',
        topicEn: 'There be Proximity Rule',
        question: 'There _______ an eraser and two pencils in my pencil box.',
        questionEn: 'There _______ an eraser and two pencils in my pencil box.',
        options: ['is', 'are', 'have', 'be'],
        optionsEn: ['is', 'are', 'have', 'be'],
        correctIndex: 0,
        explanation: 'There be 句型遵循就近原则，紧靠 be 动词的名词 an eraser 为单数，用 is。选 A。',
        explanationEn: 'By the Proximity Rule in "There be" sentences, the nearest noun "an eraser" is singular, requiring "is". Option A.',
        questionType: 'choice',
        difficulty: 'easy',
        keyPoints: ['There be 句型', '就近原则']
      },
      {
        id: 'hw-chu1-eng-3',
        subject: '英语',
        gradeStage: '初中',
        gradeLevel: '初一',
        topic: '情态动词 can 与能力表达',
        topicEn: 'Modal Verb Can & Abilities',
        question: '— Can your sister speak Japanese?\n— No, she can\'t, but she _______ (sing) English songs very well.',
        questionEn: '— Can your sister speak Japanese?\n— No, she can\'t, but she _______ (sing) English songs very well.',
        options: ['sings', 'sing', 'singing', 'to sing'],
        optionsEn: ['sings', 'sing', 'singing', 'to sing'],
        correctIndex: 0,
        explanation: '后半句是 she 作主语的肯定陈述句，she 是第三人称单数，动词 sing 变三单 sings。选 A。',
        explanationEn: 'The second clause is an affirmative statement with subject "she", requiring singular "sings". Option A.',
        questionType: 'choice',
        difficulty: 'medium',
        keyPoints: ['动词三单', '日常交际']
      }
    ]
  },
  {
    id: 'lesson-english-gaozhong-grammar',
    subject: '英语',
    topic: '非谓语动词作定语与状语秒杀攻略',
    topicEn: 'Mastering Non-Finite Verbs as Modifiers & Adverbials',
    gradeLevel: '高三/高考',
    semester: '上学期',
    countryRegion: '中国大陆',
    educationSystem: '人教版 (高中英语新课标)',
    teacherName: '智学名师 · Sarah 老师',
    teacherNameEn: 'Master Teacher · Sarah',
    lectureTitle: '高考英语名师讲堂：非谓语动词作定语与状语秒杀法',
    lectureTitleEn: 'High School English Masterclass: Demystifying Non-Finite Verbs in Context',
    objective: '掌握非谓语动词的三大形态（to do / doing / done），熟练运用逻辑主语判定主被动与时态。',
    objectiveEn: 'Master the three non-finite verb forms and apply logical subject tests to determine voice and aspect.',
    lectureSections: [
      {
        sectionTitle: '一、场景导入：破解高考长难句的“黄金钥匙”',
        sectionTitleEn: 'Section 1: The Golden Key to Complex Sentence Structures',
        objective: '掌握非谓语动词的核心概念与逻辑主语判定法',
        objectiveEn: 'Understand core concepts and logical subject identification',
        content: '### 高考长难句突破核心\n- **核心地位**：语法填空与阅读中超 **40%** 语法考点聚焦于非谓语动词。\n- **核心本质**：动词不再充当谓语，转而充当定语、状语或补足语。\n- **解题第一步**：精准锁定修饰对象的**逻辑主语**，判定主动还是被动关系！',
        contentEn: '### Mastering Complex Syntactic Structures\n- **Significance**: Over **40%** of high-level examination items focus on non-finite forms.\n- **Grammatical Role**: Verbs step down from predicate roles to act as adjectives or adverbials.\n- **Golden First Step**: Identify the **logical subject** to determine active vs passive relationships!',
        keyTakeaway: '非谓语动词判定第一步：找准它的【逻辑主语】，判定主动还是被动！',
        keyTakeawayEn: 'First rule of non-finite verbs: pinpoint the logical subject to verify active vs passive voice!',
        checkpoint: {
          question: '判断句子中非谓语动词的主被动形式，最关键的第一步是：',
          questionEn: 'What is the most crucial first step in determining the form of a non-finite verb?',
          options: ['A. 找句子的宾语', 'B. 找非谓语动词的逻辑主语', 'C. 翻译整段中文', 'D. 判断句子字数'],
          optionsEn: ['A. Find the sentence object', 'B. Find its logical subject', 'C. Translate the paragraph', 'D. Count the words'],
          correctIndex: 1,
          explanation: '非谓语动词的形态（doing/done/to do）完全取决于它与其“逻辑主语”之间的主被动及时间关系。',
          explanationEn: 'The form of a non-finite verb is governed by its active or passive relationship with its logical subject.'
        }
      },
      {
        sectionTitle: '二、核心口诀与实战推导：doing 与 done 的瞬间秒杀',
        sectionTitleEn: 'Section 2: Instant Rules for Doing (Active) vs Done (Passive)',
        objective: '掌握 doing（主动进行）、done（被动完成）与 to do（目的将来）的用法',
        objectiveEn: 'Differentiate doing (active), done (passive), and to-do (future/purpose)',
        content: '### 三大形态速记法则\n1. **doing（现在分词）**：表示与逻辑主语为**主动关系**或**正在进行**。\n2. **done（过去分词）**：表示与逻辑主语为**被动关系**或**已经完成**。\n3. **to do（不定式）**：表示**目的**、**结果**或**将要发生**。\n- **实战例句**：*Inspired by the talk, students studied hard.*（学生被激励，用 done）。',
        contentEn: '### Three Core Forms at a Glance\n1. **doing (Present Participle)**: Expresses **active** or **ongoing** action.\n2. **done (Past Participle)**: Expresses **passive** or **completed** action.\n3. **to do (Infinitive)**: Expresses **purpose**, **result**, or **future action**.\n- **Example**: *Inspired by the speech, students worked harder.* (Passive inspiration requires "done").',
        keyTakeaway: '口诀：“主动进行用 doing，被动完成用 done，目的将来用 to do”！',
        keyTakeawayEn: 'Mnemonic: "Active/ongoing requires -ing, passive/completed requires -ed, purpose/future requires to-do"!',
        checkpoint: {
          question: '_______ (hear) the good news, all the children jumped with joy.',
          questionEn: '_______ (hear) the good news, all the children jumped with joy.',
          options: ['A. Hearing', 'B. Heard', 'C. To hear', 'D. Having heard being'],
          optionsEn: ['A. Hearing', 'B. Heard', 'C. To hear', 'D. Having heard being'],
          correctIndex: 0,
          explanation: '逻辑主语 all the children 与 hear 之间是主动关系（孩子们主动听到好消息），作伴随状语用现在分词 Hearing。',
          explanationEn: 'The logical subject "the children" actively performs the action "hear", which requires the present participle "Hearing".'
        }
      }
    ],
    simplifiedExplanation: '我们可以把非谓语动词想象成动词的“兼职变形金刚”：它不再当主句的大当家（谓语），而是变成形容词或副词去修饰别人。如果是它自己主动去干的事情，就穿上 doing 战袍；如果是被别人干的事情，就穿上 done 战袍！',
    simplifiedExplanationEn: 'Think of non-finite verbs as part-time Transformers: they step down from being the main sentence leader (predicate) and act as adjectives or adverbs. If the subject actively does the work, it wears the "-ing" armor; if it receives the action, it wears the "-ed" armor!',
    checkQuestionPrompt: '同学们，上面关于“逻辑主语主动用 doing、被动用 done”的核心推导法则，你听懂了吗？',
    checkQuestionPromptEn: 'Students, did you understand the core deduction rule that active voice takes "doing" while passive takes "done"?',
    homeworkQuiz: [
      {
        id: 'hw-eng-gaosan-1',
        subject: '英语',
        gradeStage: '高中',
        gradeLevel: '高三/高考',
        topic: '非谓语动词',
        topicEn: 'Non-Finite Verbs',
        question: 'The bridge _______ (build) last year has greatly improved the local transportation.',
        questionEn: 'The bridge _______ (build) last year has greatly improved the local transportation.',
        options: ['building', 'built', 'to build', 'having built'],
        optionsEn: ['building', 'built', 'to build', 'having built'],
        correctIndex: 1,
        explanation: '句子谓语是 has improved。bridge 与 build 之间是被动且已完成关系，作定语修饰 the bridge，填 built。选 B。',
        explanationEn: 'The predicate verb of the sentence is "has improved". "The bridge" receives the action of "build", requiring the past participle "built" as an adjective modifier.',
        questionType: 'choice',
        difficulty: 'medium',
        keyPoints: ['非谓语作后置定语', '过去分词表被动完成']
      },
      {
        id: 'hw-eng-gaosan-2',
        subject: '英语',
        gradeStage: '高中',
        gradeLevel: '高三/高考',
        topic: '非谓语动词作目的状语',
        topicEn: 'Infinitive of Purpose',
        question: '_______ (improve) our environment, we should plant more trees in our community.',
        questionEn: '_______ (improve) our environment, we should plant more trees in our community.',
        options: ['To improve', 'Improving', 'Improved', 'Improve'],
        optionsEn: ['To improve', 'Improving', 'Improved', 'Improve'],
        correctIndex: 0,
        explanation: '句首表示“为了改善环境”，表示目的，用不定式 To improve 作目的状语。选 A。',
        explanationEn: 'The phrase express the purpose ("in order to improve"), requiring the infinitive "To improve".',
        questionType: 'choice',
        difficulty: 'easy',
        keyPoints: ['不定式作目的状语']
      }
    ]
  },
  {
    id: 'lesson-english-chuzhong-tenses',
    subject: '英语',
    topic: '中考英语核心语法：现在完成时与过去时高频易错辨析',
    topicEn: 'Present Perfect vs Past Simple Masterclass',
    gradeLevel: '初三/中考',
    semester: '上学期',
    countryRegion: '中国大陆',
    educationSystem: '人教版 (九年级)',
    teacherName: '智学名师 · Mark 老师',
    teacherNameEn: 'Master Teacher · Mark',
    lectureTitle: '中考英语名师讲堂：现在完成时与一般过去时深度辨析',
    lectureTitleEn: 'Junior High English Masterclass: Present Perfect vs Past Simple Decoded',
    objective: '厘清现在完成时与一般过去时的本质差异，掌握短暂动词与延续性状态转换法则。',
    objectiveEn: 'Master the distinction between Present Perfect and Past Simple and learn durative verb conversions.',
    lectureSections: [
      {
        sectionTitle: '一、导入：为什么很多同学分不清 have done 和 did？',
        sectionTitleEn: 'Section 1: Why Students Confuse "Have Done" with "Did"',
        objective: '掌握现在完成时与一般过去时的核心语境差异',
        objectiveEn: 'Understand core contextual differences between tenses',
        content: '### 核心时态本质区分\n- **一般过去时**：单纯陈述**过去的某一具体时刻**发生的事实（如 *yesterday*, *last year*）。\n- **现在完成时**：强调过去发生的动作**对现在造成的影响**，或动作从过去**一直持续到现在**。\n- **核心公式**：主语 + have/has + 动词过去分词 (p.p.)。',
        contentEn: '### Essential Tense Distinctions\n- **Past Simple**: Reports historical facts at a **specific past timestamp** (*yesterday*, *in 2020*).\n- **Present Perfect**: Bridges past actions with **present consequences** or **ongoing continuity**.\n- **Structure**: Subject + have/has + Past Participle (p.p.).',
        keyTakeaway: '区别秘诀：过去时着眼于过去（带具体过去时间），现在完成时着眼于现在！',
        keyTakeawayEn: 'Key rule: Past Simple looks back at a specific point in time; Present Perfect connects with the present moment!',
        checkpoint: {
          question: '句子 "I _______ my homework already." 应填入的时态形式是：',
          questionEn: 'Which verb form correctly completes "I _______ my homework already."?',
          options: ['A. finished', 'B. have finished', 'C. finish', 'D. will finish'],
          optionsEn: ['A. finished', 'B. have finished', 'C. finish', 'D. will finish'],
          correctIndex: 1,
          explanation: '句末有标志词 already，强调过去完成作业对现在产生的影响（现在作业已做完），使用现在完成时 have finished。',
          explanationEn: 'The time marker "already" emphasizes the present result of a completed action, requiring Present Perfect.'
        }
      },
      {
        sectionTitle: '二、高频考点突破：延续性动词转化与时间标志词',
        sectionTitleEn: 'Section 2: Durative Verbs Transformation & Time Markers',
        objective: '掌握短暂性动词与 for/since 搭配时的延续性状态转换',
        objectiveEn: 'Convert momentary verbs into continuous states with for/since',
        content: '### 中考必考动词转换表\n- **buy ⟹ have**：*He has had the book for 3 days.*\n- **join ⟹ be in / be a member of**：*She has been in the club since May.*\n- **die ⟹ be dead**：*The dog has been dead for two months.*\n- **leave ⟹ be away**：*They have been away for a week.*',
        contentEn: '### Vital Durative Verb Transformations\n- **buy ⟹ have**: *He has had the book for 3 days.*\n- **join ⟹ be a member of**: *She has been a member since May.*\n- **die ⟹ be dead**: *The tree has been dead for months.*\n- **leave ⟹ be away**: *They have been away for a week.*',
        keyTakeaway: '中考必背口诀：for/since 连用找延续，短暂动词变状态！',
        keyTakeawayEn: 'Exam rule: Pair for/since with ongoing states rather than momentary action verbs!',
        checkpoint: {
          question: '下列句子中表达完全正确的是：',
          questionEn: 'Which of the following sentences is grammatically correct?',
          options: [
            'A. He has joined the army for 2 years.',
            'B. He has been in the army for 2 years.',
            'C. He joined the army since 2 years ago.',
            'D. He has bought the bike for two weeks.'
          ],
          optionsEn: [
            'A. He has joined the army for 2 years.',
            'B. He has been in the army for 2 years.',
            'C. He joined the army since 2 years ago.',
            'D. He has bought the bike for two weeks.'
          ],
          correctIndex: 1,
          explanation: 'joined 和 bought 均为瞬间短暂动词，不能与 for + 段时间连用。需转换为延续性状态 has been in the army。选 B。',
          explanationEn: '"join" is a momentary action. With "for 2 years", it must be converted into the durative state "has been in the army".'
        }
      }
    ],
    simplifiedExplanation: '我们可以用“照片”与“连线”做比喻：一般过去时就像一张泛黄的老照片，只定格在过去的那个瞬间；而现在完成时就像一根拉扯的橡皮筋，一头连在过去，另一头紧紧系在现在的你身上！',
    simplifiedExplanationEn: 'Think of Past Simple as a vintage photograph frozen at a specific moment in the past. Present Perfect is like an elastic band: anchored in the past, but stretched right up to touch you in the present!',
    checkQuestionPrompt: '同学们，上面关于“短暂动词变状态”与 for/since 连用规则，你听懂了吗？',
    checkQuestionPromptEn: 'Students, did you grasp the rule of converting momentary action verbs into ongoing states when used with for/since?',
    homeworkQuiz: [
      {
        id: 'hw-eng-chusan-1',
        subject: '英语',
        gradeStage: '初中',
        gradeLevel: '初三/中考',
        topic: '现在完成时延续性动词',
        topicEn: 'Present Perfect Durative Verbs',
        question: 'His grandfather _______ for five years, but he still misses him very much.',
        questionEn: 'His grandfather _______ for five years, but he still misses him very much.',
        options: ['has died', 'died', 'has been dead', 'is dying'],
        optionsEn: ['has died', 'died', 'has been dead', 'is dying'],
        correctIndex: 2,
        explanation: '句子有 for five years 时间段，die 为瞬间动词不能直接连用，需转化为延续性状态 has been dead。选 C。',
        explanationEn: 'With "for five years", the momentary verb "die" must be converted into the durative state "has been dead".',
        questionType: 'choice',
        difficulty: 'medium',
        keyPoints: ['现在完成时短暂动词转化', 'for + 时间段']
      }
    ]
  },
  {
    id: 'lesson-chu1-math',
    subject: '数学',
    topic: '有理数与数轴绝对值图解',
    topicEn: 'Rational Numbers, Number Lines & Absolute Value Geometry',
    gradeLevel: '初一',
    semester: '上学期',
    countryRegion: '中国大陆',
    educationSystem: '人教版 (七年级)',
    teacherName: '智学名师 · 陈老师',
    teacherNameEn: 'Master Teacher · Chen',
    lectureTitle: '初一数学名师讲堂：有理数、数轴与绝对值几何化简破局',
    lectureTitleEn: 'Junior 1 Math Masterclass: Rational Numbers & Absolute Value Demystified',
    lectureSections: [
      {
        sectionTitle: '一、概念通俗透视：从正负数到数轴上的几何距离',
        sectionTitleEn: 'Section 1: Geometric Distance on the Number Line',
        content: '同学们好！欢迎来到初一数学名师讲堂。进入初中后，数学学习的第一大飞跃就是从【非负数】扩展到了【有理数】。很多同学觉得正负数运算容易出错，特别是绝对值符号不知道怎么去。今天陈老师教大家用“数轴几何距离”法则，秒杀一切绝对值化简题！',
        contentEn: 'Hello students! Welcome to Junior 1 Math Masterclass. Transitioning to middle school expands our horizon from non-negative numbers to rational numbers. Today, let us master the geometric distance principle on the number line to conquer absolute value simplifications effortlessly!',
        keyTakeaway: '绝对值 |a| 的几何意义就是数轴上点 a 到原点的【距离】，距离永远是非负数（≥ 0）！',
        keyTakeawayEn: 'The geometric meaning of |a| is the non-negative distance from point a to the origin on the number line!'
      },
      {
        sectionTitle: '二、核心解法精讲：去绝对值符号的标准三步法',
        sectionTitleEn: 'Section 2: Standard 3-Step Absolute Value Removal',
        content: '我们来看一道初一期中常考压轴题：已知 a < 0 < b，且 |a| > |b|，如何化简 |a| + |b| - |a+b|？第一步：判断各绝对值内部代数式的正负号！因为 a < 0，所以 |a| = -a；因为 b > 0，所以 |b| = b；因为 a<0 且 |a|>|b|，可知 a+b < 0，所以 |a+b| = -(a+b) = -a-b。第二步：代入原式：(-a) + b - (-a - b) = -a + b + a + b = 2b！大家看，去掉符号后再合并同类项，是不是非常工整简单？',
        contentEn: 'Let us solve a classic exam problem: Given a < 0 < b and |a| > |b|, simplify |a| + |b| - |a+b|. Step 1: Determine the sign of each inner expression: |a| = -a, |b| = b, and since a+b < 0, |a+b| = -(a+b) = -a-b. Step 2: Substitute and simplify: (-a) + b - (-a - b) = 2b. Clean and elegant!',
        keyTakeaway: '绝对值去符号口诀：“正数直接去，负数变相反，零去依然零”！',
        keyTakeawayEn: 'Mnemonic: "Positive stays positive, negative flips its sign, zero remains zero"!'
      }
    ],
    simplifiedExplanation: '如果觉得抽象，我们可以把数轴想象成一条直线跑道：原点是起点 0。往右走是正数，往左走是负数。绝对值 |a| 就是你从起点 0 走到点 a 所跑的【实际步数】。不管你往左跑还是往右跑，跑过的步数（距离）永远是正数！',
    simplifiedExplanationEn: 'Think of the number line as a running track with 0 as the starting block. Moving right is positive; moving left is negative. The absolute value is simply the actual step count or distance you traveled, which is always positive!',
    checkQuestionPrompt: '同学们，上面关于“绝对值几何意义与去符号口诀”，你听懂了吗？',
    checkQuestionPromptEn: 'Students, did you understand the geometric meaning of absolute values and the sign removal rule?',
    homeworkQuiz: [
      {
        id: 'hw-chu1-1',
        subject: '数学',
        gradeStage: '初中',
        gradeLevel: '初一',
        topic: '绝对值去符号',
        topicEn: 'Absolute Value Simplification',
        question: '若 |x - 2| = 2 - x，则 x 的取值范围是（ ）。',
        questionEn: 'If |x - 2| = 2 - x, what is the range of values for x?',
        options: ['A. x > 2', 'B. x ≥ 2', 'C. x < 2', 'D. x ≤ 2'],
        optionsEn: ['A. x > 2', 'B. x ≥ 2', 'C. x < 2', 'D. x ≤ 2'],
        correctIndex: 3,
        explanation: '因 |x - 2| = -(x - 2) = 2 - x，说明绝对值里面的代数式 x - 2 必为非正数，即 x - 2 ≤ 0 ⟹ x ≤ 2。答案选 D。',
        explanationEn: 'Since |x - 2| = -(x - 2), x - 2 must be non-positive, meaning x - 2 ≤ 0 ⟹ x ≤ 2.',
        questionType: 'choice',
        difficulty: 'medium',
        keyPoints: ['绝对值非负性', '去绝对值变号法则']
      }
    ]
  },
  {
    id: 'lesson-1-gaosan',
    subject: '物理',
    topic: '牛顿第二定律综合应用与受力分析',
    topicEn: 'Newton\'s Second Law & Force Analysis Masterclass',
    gradeLevel: '高三/高考',
    semester: '上学期',
    countryRegion: '中国大陆',
    educationSystem: '人教版 (新高考新教材)',
    teacherName: '智学名师 · 张特级',
    teacherNameEn: 'Master Teacher · Zhang',
    lectureTitle: '高考物理一轮复习：牛顿第二定律综合模型与受力分析破局',
    lectureTitleEn: 'Physics Masterclass: Newton\'s Second Law & Force Decomposition Models',
    lectureSections: [
      {
        sectionTitle: '一、经典场景导入：为什么受力分析决定高考物理成败？',
        sectionTitleEn: 'Section 1: Why Force Analysis Decides Physics Success',
        content: '同学们好！欢迎来到高考物理名师讲堂。高三一轮复习中，力学是整座物理大厦的基石。很多同学觉得“公式我都背过（F=ma），但一做高考大题就毫无头绪”。根本原因在于：你没有真正掌握【受力分析三步法】与【瞬时性判定】。今天张老师带大家彻底拿下这个必考核心模型！',
        contentEn: 'Welcome students to our Physics Masterclass! Mechanics is the bedrock of physics. The most common stumbling block is not memorizing F=ma, but mastering systematic free-body diagrams and instantaneous vector analysis. Today, let us dismantle this essential topic step by step!',
        keyTakeaway: '受力分析是解题的第一要素，F合 与 a 具有瞬时对应性与同向性！',
        keyTakeawayEn: 'Free-body diagrams are the foremost step in physics; net force and acceleration share instantaneous proportionality and direction!'
      },
      {
        sectionTitle: '二、核心推导与解题规范：斜面滑块与超重失重拆解',
        sectionTitleEn: 'Section 2: Inclined Plane Decomposition & Apparent Weight',
        content: '我们来看一道高考真题变式：质量为 m 的物体放在倾角为 θ 的粗糙斜面上，受到水平向右的拉力 F。如何判断它的运动趋势？首先，隔离物体 m；第二步，画出重力 mg（竖直向下）、支持力 N（垂直斜面向上）、拉力 F（水平向右）；第三步，将所有力沿【平行斜面】和【垂直斜面】建立直角坐标系正交分解！垂直斜面方向无加速度：N = mg*cosθ + F*sinθ；平行斜面方向：若拉力分量大于重力分量与最大静摩擦力，物体将向上加速：F*cosθ - mg*sinθ - f = m*a。大家看，思路是不是瞬间清爽了？',
        contentEn: 'Let us examine a block of mass m on a rough incline of angle θ under horizontal pulling force F. Step 1: Isolate mass m. Step 2: Identify gravity (mg downwards), normal force (N perpendicular to incline), and pulling force (F horizontal). Step 3: Decompose forces orthogonally along and perpendicular to the incline. Perpendicular: N = mg*cosθ + F*sinθ. Along the incline: F*cosθ - mg*sinθ - f = m*a. The logic is rigorous and transparent!',
        keyTakeaway: '建系原则：顺着加速度方向建 x 轴，垂直加速度建 y 轴，分解不受力的“斜力”。',
        keyTakeawayEn: 'Coordinate rule: align the x-axis with acceleration, y-axis perpendicular, and decompose inclined force vectors.'
      }
    ],
    simplifiedExplanation: '如果觉得抽象，我们可以用“推购物车上斜坡”来比喻：拉力 F 往右拉，一部分力用来把车往斜坡上拽（F*cosθ），一部分力把车往斜坡面上压（F*sinθ，增加了地面摩擦）。只有向上的拽力大于重力下滑力与摩擦力之和，车子才会加速跑起来！',
    simplifiedExplanationEn: 'Think of pushing a shopping cart up a ramp: your pushing force splits into an upward pull along the ramp (F*cosθ) and a downward press onto the surface (F*sinθ). Only when the upward pull overcomes gravity\'s downward component and friction will the cart accelerate!',
    checkQuestionPrompt: '同学们，上面关于斜面正交分解与 F合=ma 的推导逻辑，你听懂了吗？',
    checkQuestionPromptEn: 'Students, did you understand the orthogonal force decomposition and F_net=ma deduction?',
    homeworkQuiz: [
      {
        id: 'hw-gaosan-1',
        subject: '物理',
        gradeStage: '高中',
        gradeLevel: '高三/高考',
        topic: '牛顿第二定律',
        topicEn: 'Newton\'s Second Law',
        question: '质量为 2kg 的物体在倾角 30° 的光滑斜面上下滑，重力加速度 g=10m/s²。求物体的加速度大小为：',
        questionEn: 'An object of mass 2kg slides down a smooth incline of 30° with g=10m/s². What is its acceleration?',
        options: ['A. 2.5 m/s²', 'B. 5.0 m/s²', 'C. 8.6 m/s²', 'D. 10 m/s²'],
        optionsEn: ['A. 2.5 m/s²', 'B. 5.0 m/s²', 'C. 8.6 m/s²', 'D. 10 m/s²'],
        correctIndex: 1,
        explanation: '在光滑斜面上，合外力只有重力沿斜面的分力：F合 = mg*sin30° = 2*10*0.5 = 10N。根据 F合 = ma，a = 10/2 = 5m/s²。答案选 B。',
        explanationEn: 'Net force along smooth incline is F = mg*sin30° = 2 * 10 * 0.5 = 10N. By F=ma, a = 10/2 = 5.0 m/s².',
        questionType: 'choice',
        difficulty: 'medium',
        keyPoints: ['牛顿第二定律', '斜面受力分析']
      },
      {
        id: 'hw-gaosan-2',
        subject: '物理',
        gradeStage: '高中',
        gradeLevel: '高三/高考',
        topic: '超重与失重',
        topicEn: 'Apparent Weight',
        question: '人站在电梯中的体重计上，当电梯以 2m/s² 的加速度加速上升时，体重计的示数与静止时相比：',
        questionEn: 'A person stands on a scale in an elevator accelerating upward at 2 m/s². The scale reading compared to at rest is:',
        options: ['A. 增大（超重）', 'B. 减小（失重）', 'C. 不变', 'D. 变为零'],
        optionsEn: ['A. Increases (Overweight)', 'B. Decreases', 'C. Unchanged', 'D. Zero'],
        correctIndex: 0,
        explanation: '加速度向上时，N - mg = ma => N = m(g+a) > mg，此时人处于超重状态，示数增大。答案选 A。',
        explanationEn: 'With upward acceleration, N - mg = ma ⟹ N = m(g+a) > mg, producing an apparent weight increase (hypergravity).',
        questionType: 'choice',
        difficulty: 'easy',
        keyPoints: ['超重与失重', '加速度方向判断']
      }
    ]
  },
  {
    id: 'lesson-2-gaoyi',
    subject: '数学',
    topic: '二次函数的图像与区间最值（轴动区间定模型）',
    topicEn: 'Quadratic Function Extrema on Closed Intervals',
    gradeLevel: '高一',
    semester: '上学期',
    countryRegion: '中国大陆',
    educationSystem: '人教版',
    teacherName: '智学名师 · 王老师',
    teacherNameEn: 'Master Teacher · Wang',
    lectureTitle: '高一数学必修一：二次函数区间最值的分类讨论精讲',
    lectureTitleEn: 'Senior High Math: Quadratic Function Extrema on Defined Intervals',
    lectureSections: [
      {
        sectionTitle: '一、引入：初高中数学衔接的最大难点',
        sectionTitleEn: 'Section 1: The Transition from Middle to High School Math',
        content: '同学们好！初中我们学二次函数，自变量 x 通常是全体实数，最值直接看顶点。但到了高一，自变量被限制在指定闭区间 [m, n] 上！这就演变成了高中数学第一个高频考点——分类讨论。今天王老师教大家用“对称轴与区间相对位置”三步解题！',
        contentEn: 'Hello students! In junior high, the domain of a quadratic function is typically all real numbers. In high school, the domain is constrained to closed intervals [m, n], requiring systematic casework based on the position of the axis of symmetry relative to the interval.',
        keyTakeaway: '区间最值看两要素：抛物线开口方向 + 对称轴在区间的左侧、内部还是右侧！',
        keyTakeawayEn: 'Interval extrema depend on two factors: parabola orientation + axis of symmetry position relative to the interval!'
      },
      {
        sectionTitle: '二、模型拆解：开口向上 f(x)=x^2-2ax+1 在 [0, 2] 上的最小值',
        sectionTitleEn: 'Section 2: Model Dissection for f(x)=x^2-2ax+1 on [0, 2]',
        content: '我们来看开口向上的二次函数 f(x) = (x-a)^2 + 1-a^2，对称轴为 x = a。当对称轴 a 在区间左侧（a < 0）时，函数在 [0, 2] 上单调递增，最小值在左端点 f(0) 处取得；当对称轴在区间内部（0 ≤ a ≤ 2）时，最小值就是顶点的纵坐标 f(a)；当对称轴在区间右侧（a > 2）时，函数在 [0, 2] 上单调递减，最小值在右端点 f(2) 处取得。三种情况全面覆盖，绝漏掉任何一种！',
        contentEn: 'Consider f(x) = (x-a)^2 + 1-a^2 with axis of symmetry x = a on interval [0, 2]. Case 1: When a < 0, f(x) strictly increases on [0, 2], so the minimum is at f(0). Case 2: When 0 ≤ a ≤ 2, the minimum is the vertex f(a). Case 3: When a > 2, f(x) strictly decreases on [0, 2], so the minimum is at f(2). Three complete cases leaving zero loopholes!',
        keyTakeaway: '分类讨论标准：对称轴 < 左端点、对称轴在区间内、对称轴 > 右端点。',
        keyTakeawayEn: 'Standard casework: Axis < Left endpoint, Axis inside interval, Axis > Right endpoint.'
      }
    ],
    simplifiedExplanation: '我们可以想象在滑滑梯：区间 [0, 2] 就是你滑滑梯的活动范围。如果最底端（顶点）落在你的范围内，最低点就是滑滑梯的最底端；如果最底端在你左边远处，那你活动范围内最左边就是最低的；反之最右边就是最低的。',
    simplifiedExplanationEn: 'Picture a playground slide: [0, 2] is your segment of the slide. If the lowest curve point sits within your segment, that is the minimum. If the bottom curve lies far to your left, the leftmost boundary is the lowest point!',
    checkQuestionPrompt: '同学们，上面关于“对称轴与区间相对位置”的 3 种分类讨论方法，你听懂了吗？',
    checkQuestionPromptEn: 'Students, did you understand the 3-case breakdown based on the symmetry axis and interval?',
    homeworkQuiz: [
      {
        id: 'hw-gaoyi-1',
        subject: '数学',
        gradeStage: '高中',
        gradeLevel: '高一',
        topic: '二次函数最值',
        topicEn: 'Quadratic Function Extrema',
        question: '函数 f(x) = (x-1)^2 + 2 在区间 [2, 4] 上的最小值是：',
        questionEn: 'The minimum value of f(x) = (x-1)^2 + 2 on the interval [2, 4] is:',
        options: ['A. 2', 'B. 3', 'C. 11', 'D. 6'],
        optionsEn: ['A. 2', 'B. 3', 'C. 11', 'D. 6'],
        correctIndex: 1,
        explanation: '对称轴为 x = 1，区间为 [2, 4]。对称轴在区间左侧，因此 f(x) 在 [2, 4] 上递增。最小值在 x = 2 处，f(2) = (2-1)^2 + 2 = 3。答案选 B。',
        explanationEn: 'The axis is x = 1, located to the left of [2, 4]. f(x) increases on [2, 4], so minimum is at x = 2: f(2) = (2-1)^2 + 2 = 3.',
        questionType: 'choice',
        difficulty: 'easy',
        keyPoints: ['二次函数区间最值', '对称轴判定']
      }
    ]
  },
  {
    id: 'lesson-3-chusan',
    subject: '化学',
    topic: '质量守恒定律与化学方程式配平精讲',
    topicEn: 'Law of Conservation of Mass & Chemical Equation Balancing',
    gradeLevel: '初三/中考',
    semester: '上学期',
    countryRegion: '中国大陆',
    educationSystem: '人教版',
    teacherName: '智学名师 · 李老师',
    teacherNameEn: 'Master Teacher · Li',
    lectureTitle: '初三化学中考冲刺：质量守恒定律微观本质与配平技巧',
    lectureTitleEn: 'Junior 3 Chemistry: Law of Conservation of Mass & Equation Balancing',
    lectureSections: [
      {
        sectionTitle: '一、导入：为什么化学反应前后质量不会凭空消失？',
        sectionTitleEn: 'Section 1: Why Mass Never Vanishes in Reactions',
        content: '同学们好！化学是一门以实验为基础的学科。很多初三同学做实验时疑问：木炭燃烧后只剩下灰烬，质量变小了，难道质量守恒定律错了吗？当然没有！因为生成的二氧化碳气体逸散到了空气中。如果在密闭容器中，反应前后的总质量必定严格相等！',
        contentEn: 'Hello students! Welcome to Chemistry Masterclass. When charcoal burns into ash, it seems lighter—did mass disappear? Absolutely not: carbon dioxide gas escaped into the atmosphere. In a sealed container, total reactant mass precisely equals total product mass!',
        keyTakeaway: '质量守恒定律微观本质：化学反应前后，原子的种类、数目、质量均保持不变！',
        keyTakeawayEn: 'Microscopic essence: The types, counts, and individual masses of atoms remain constant in chemical reactions!'
      },
      {
        sectionTitle: '二、中考必考配平技巧：最小公倍数法与奇偶配平法',
        sectionTitleEn: 'Section 2: Least Common Multiple Equation Balancing',
        content: '配平化学方程式时，不要盲目凑数。例如配平 Fe + O2 -> Fe3O4：反应前 O 为 2 个，反应后 O 为 4 个，最小公倍数是 4，所以在 O2 前填 2；反应后 Fe 为 3 个，所以在 Fe 前填 3。即 3Fe + 2O2 = Fe3O4（点燃）。记准“六不变”：原子种类、数目、质量不变；元素种类、质量不变；物质总质量不变。',
        contentEn: 'To balance Fe + O2 -> Fe3O4: Oxygen has 2 atoms on left and 4 on right (LCM = 4), so place 2 before O2. Iron has 3 atoms on right, so place 3 before Fe. Balanced: 3Fe + 2O2 = Fe3O4. Remember the six invariants of chemical reactions!',
        keyTakeaway: '化学反应宏观与微观“六不变”，抓准原子个数守恒即能快速配平。',
        keyTakeawayEn: 'Six invariants: atom species, numbers, mass; element species, mass; total mass.'
      }
    ],
    simplifiedExplanation: '质量守恒就好像玩积木：反应前你有 3 个红积木和 4 个蓝积木，拆开后重新拼成新的模型，积木的总个数和总重量依然是 3 个红 + 4 个蓝，一个都没有掉，也没有凭空多出来！',
    simplifiedExplanationEn: 'Conservation of mass is like building blocks: if you start with 3 red and 4 blue blocks and rebuild them into a new model, the total count and weight remains 3 red and 4 blue blocks!',
    checkQuestionPrompt: '同学们，上面关于“原子种类与数目不变”及最小公倍数配平法，你听懂了吗？',
    checkQuestionPromptEn: 'Students, did you understand the conservation of atoms and the balancing method?',
    homeworkQuiz: [
      {
        id: 'hw-chusan-1',
        subject: '化学',
        gradeStage: '初中',
        gradeLevel: '初三/中考',
        topic: '质量守恒定律',
        topicEn: 'Law of Conservation of Mass',
        question: '在化学反应 A + 2B = C + 2D 中，已知 6g A 与足量 B 充分反应后生成 8g C 和 10g D，则参加反应的 B 的质量为：',
        questionEn: 'In reaction A + 2B = C + 2D, 6g of A reacts with B to produce 8g of C and 10g of D. What mass of B reacted?',
        options: ['A. 12g', 'B. 14g', 'C. 16g', 'D. 18g'],
        optionsEn: ['A. 12g', 'B. 14g', 'C. 16g', 'D. 18g'],
        correctIndex: 0,
        explanation: '根据质量守恒定律：反应物总质量 = 生成物总质量。m(A) + m(B) = m(C) + m(D) => 6g + m(B) = 8g + 10g = 18g => m(B) = 12g。答案选 A。',
        explanationEn: 'By conservation of mass: m(A) + m(B) = m(C) + m(D) ⟹ 6g + m(B) = 8g + 10g = 18g ⟹ m(B) = 12g.',
        questionType: 'choice',
        difficulty: 'easy',
        keyPoints: ['质量守恒定律计算', '质量守恒定律微观本质']
      }
    ]
  }
];


