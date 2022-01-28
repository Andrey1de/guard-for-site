

export interface IWatchJson{
    siteId: number;// "2";
    guardId: number;// "101";
    beginMs: number; // new Date(beginS * 1000)
    endMs: number;// new Date(endS * 1000);
    get isSitePlan(): boolean;
    get isGuardPlan(): boolean;

};

