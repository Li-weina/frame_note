## 新建表
```javaScript
-- 创建学生表
DROP TABLE student
CREATE TABLE `student`
(
id int NOT NULL,
name VARCHAR(64) NOT NULL,
age int NOT NULL,
city VARCHAR(32)
)
-- 增加身份证号列
ALTER TABLE student ADD COLUMN idcard VARCHAR(18) NULL;
-- 修改列
ALTER TABLE student MODIFY COLUMN idcard VARCHAR(32) NULL;
-- SELECT * FROM student
DESC student
-- 删除一列
ALTER TABLE student DROP COLUMN idcard
-- 添加主键约束
ALTER TABLE student ADD PRIMARY KEY(id) AUTO_INCREMENT;
-- 添加唯一约束
ALTER TABLE student ADD UNIQUE INDEX uq_index(idcard)
-- 增加默认值
ALTER TABLE student MODIFY COLUMN city VARCHAR(32) DEFAULT '北京'

id
name
age
city
idcard
-- 在age后面加一列
ALTER TABLE student ADD COLUMN province VARCHAR(32) AFTER age;

CREATE TABLE score
(
student_id int
)
-- 创建约束
ALTER TABLE score ADD CONSTRAINT fk_student_id FOREIGN KEY(student_id) REFERENCES student(id)
-- 在项目永远不会创建这个约束
ALTER TABLE score DROP FOREIGN KEY fk_student_id;
DESC score
```

DDL 数据定义语言（建表）
DML 数据操作语言（对表中数据进行操作）
DCL 数据控制语言(用户权限和分组)

## 操作表
```javaScript
INSERT INTO
student(name,idcard,age,city)
VALUES('张三','100',78,DEFAULT)

-- id 6 idcard= 300，age=18
UPDATE student 
SET idcard=200,age=89
WHERE id=6;

UPDATE student
SET city='北京'
WHERE id=1 OR id=3;
SELECT * FROM student
WHERE city IS NOT NULL;

DELETE FROM student
WHERE idcard=200;
-- 普通的SQL操作会就日志，并且可以还原
-- truncate操作不会记录日志，并且不会还原

TRUNCATE TABLE student
```
## 查询表
