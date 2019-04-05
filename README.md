# 项目介绍
node原生http模块 + 原生ajax + mysql 制作的一个登陆注册系统。
项⽬后端分为web层，业务层，DAO层，数据层。
功能：登陆拦截，注册⽤户，读写cookie，登陆跳转，⽇志⽂件。

# 工作流程
 前台请求静态文件，后台会读取cookie信息。如果用户未登陆无论请求什么页面都会重定向到login页面。如果请求的页面不存在返回404。未登陆状态下只能访问到注册页面、登陆页面和404页面。
 
注册页面学号的输入框失去焦点时，会向后台发送一个hasUser请求。node会mysql查询学号是否有重复。并将结果返回到浏览器。如果学号有重复页面会有提示。点击注册按钮后浏览器会向后台发送一个sign请求，如果用户输入的注册信息都合法，node会把信息存储到mysql数据库中。

登陆页面学号的输入框和注册页面一样。点击登陆按钮后。浏览器会向后台发送一个login请求。node会根据学号查询数据库。如果密码和数据库中的密码一样则返回ok。后台会返回一个cookie给浏览器。

#mysql表
create database school;
create table student
(
  id      int auto_increment comment 'student id'
    primary key,
  stu_num int          not null comment 'student number',
  name    varchar(32)  not null comment 'struent name',
  age     int          not null comment 'student age',
  class   int          not null comment 'student class',
  pwd     varchar(128) not null,
  constraint student_stu_num_uindex
    unique (stu_num)
);
