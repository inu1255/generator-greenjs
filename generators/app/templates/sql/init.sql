-- 用户表
create table if not exists user (
  id int unsigned auto_increment primary key,
  account varchar(32) default null,
  email varchar(64) default null,
  telphone varchar(11) default null,
  password varchar(32) default null,
  name varchar(32) default null,
  avatar varchar(1024) default null,
  profile varchar(255) default null,
  role varchar(32) default '',
  money int default 100,
  used_money int default 0,
  port int default 0,
  invite int default 0,
  create_at timestamp default current_timestamp,
  unique key user_account_unique (account),
  unique key user_email_unique (email),
  unique key user_telphone_unique (telphone)
) auto_increment=1024;

-- 验证码表
create table if not exists verify (
  id int unsigned auto_increment primary key,
  title varchar(64) default null,
  code varchar(16) default null,
  rest int(11) default '10',
  update_at bigint not null default 0
);

-- 文件表
create table if not exists file (
  id int unsigned auto_increment primary key,
  create_id int(11) default null,
  name varchar(128) default null,
  ext varchar(32) default null,
  md5 varchar(32) default null,
  create_at timestamp default current_timestamp
);
