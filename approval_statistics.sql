CREATE TABLE `approval_data` (
`approval_data_id` varchar(255) NOT NULL COMMENT '主键，对应审核系统的approval_data的主键',
`approval_id` varchar(255) NULL COMMENT '关联 approval 主键',
`node_type` varchar(100) NULL COMMENT '审核节点类型',
`audit_at` timestamp NULL COMMENT '审核时间',
`audit_result` tinyint NULL COMMENT '审核结果 通过或不通过',
`lightspot` tinyint(1) NULL DEFAULT 0 COMMENT '是否有亮点， 0无， 1有',
`example` tinyint(1) NULL DEFAULT 0 COMMENT '标准例\\反例\\无 1\\-1\\0',
`lightspot_reson` varchar(500) NULL COMMENT '亮点理由',
`issue_type` tinyint(1) NULL DEFAULT 0 COMMENT '问题类型,0无，1建议，2小错误，3大错误',
`designer_duty` tinyint(1) NULL DEFAULT 0 COMMENT '是否是设计师原因 0不是，1是',
`demander_duty` tinyint(1) NULL DEFAULT 0 COMMENT '是否需求方原因 0否 1是',
PRIMARY KEY (`approval_data_id`) 
);

CREATE TABLE `case_stat` (
`case_id` varchar(255) NOT NULL COMMENT '案子id',
`case_code` varchar(255) NULL COMMENT '案子编号',
`case_type` varchar(255) NULL COMMENT '案子类型',
`case_phases` varchar(255) NOT NULL COMMENT '案子所在阶段',
`case_difficulty` tinyint NULL COMMENT '案子难度',
`case_state` tinyint NULL COMMENT '案子状态',
`case_project` varchar(255) NULL COMMENT '案子所属项目',
`designer_id` varchar(100) NOT NULL COMMENT '设计师user_id',
`designer_name` varchar(50) NULL COMMENT '设计师姓名',
`designer_department` varchar(255) NULL COMMENT '设计师部门',
`designer_level` varchar(10) NULL COMMENT '设计师P级',
`audit_count` int NULL COMMENT '总审核次数',
`pass_count` int NULL COMMENT '总通过次数',
`md_audit_count` int NULL COMMENT '主策总审核次数',
`md_pass_count` int NULL COMMENT '主策通过次数',
`agent_audit_count` int NULL COMMENT '代审总审核次数',
`agent_pass_count` int NULL COMMENT '代审通过次数',
`lightspot` int NULL COMMENT '亮点个数',
`small_flower` int NULL COMMENT '小红花个数',
`big_flower` int NULL COMMENT '大红花个数',
`suggestion` int NULL COMMENT '建议个数',
`small_mistake` int NULL COMMENT '小错误个数',
`big_mistake` int NULL COMMENT '大错误个数',
`designer_duty` int NULL COMMENT '设计师责任个数',
`demander_duty` int NULL COMMENT '需求方责任个数',
`pass_at` timestamp NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '案子通过时间',
`create_at` timestamp NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '案子创建时间',
PRIMARY KEY (`case_id`, `case_phases`, `designer_id`) 
);

CREATE TABLE `approval` (
`approval_id` varchar(255) NOT NULL COMMENT '提审id（对应审核系统）',
`source_id` varchar(255) NULL COMMENT '案子快照id',
`case_id` varchar(255) NULL COMMENT '案子id',
`case_code` varchar(255) NULL COMMENT '案子编号，tqd',
`case_name` varchar(255) NULL COMMENT '案子名称',
`case_type` varchar(255) NULL COMMENT '案子类型',
`case_difficulty` tinyint NULL COMMENT '案子难度',
`case_design_status` varchar(100) NULL COMMENT '案子设计状态',
`case_produce_status` varchar(100) NULL COMMENT '案子制作状态',
`designer_id` varchar(100) NULL COMMENT '设计师user_id',
`designer_name` varchar(50) NULL COMMENT '设计师姓名',
`designer_department` varchar(255) NULL COMMENT '设计师部门',
`designer_level` varchar(10) NULL COMMENT '设计师P级',
`auditor_id` varchar(100) NULL COMMENT '审核者user_id',
`auditor_name` varchar(255) NULL COMMENT '审核者姓名',
`auditor_role` varchar(255) NULL COMMENT '审核者角色',
`audit_at` timestamp NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '审核时间',
`audit_result` tinyint NULL DEFAULT 0 COMMENT '审核结果 0待审，1通过，2不通过',
`commit_at` timestamp NULL COMMENT '提交审核时间',
`flower_award` tinyint(1) NULL DEFAULT 0 COMMENT '奖励花，0无， 1小花，2大花',
PRIMARY KEY (`approval_id`) 
);

CREATE TABLE `no_pass_reason` (
`approval_data_id` varchar(255) NOT NULL COMMENT 'approval_data 主键',
`type` tinyint(1) NOT NULL DEFAULT 1 COMMENT '不通过原因类型 1需求方 2设计师',
`reason` varchar(500) NOT NULL COMMENT '原因描述',
PRIMARY KEY (`approval_data_id`, `type`, `reason`) 
);

