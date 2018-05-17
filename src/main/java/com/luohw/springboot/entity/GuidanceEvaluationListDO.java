package com.luohw.springboot.entity;

import java.io.Serializable;
import java.util.Date;

public class GuidanceEvaluationListDO implements Serializable {

	/**
	 *主键，自增
	 */
	private Long id;

	/**
	 *医院ID
	 */
	private Long hospitalId;

	/**
	 *医院名称
	 */
	private String hospitalName;

	/**
	 *院区id
	 */
	private Long hospCompoundId;

	/**
	 *院区名称
	 */
	private String hospCompoundName;

	/**
	 *科室id
	 */
	private Long deptId;

	/**
	 *科室名称
	 */
	private String deptName;

	/**
	 *病区id
	 */
	private Long wardId;

	/**
	 *病区名称
	 */
	private String wardName;

	/**
	 *床位id
	 */
	private Long bedId;

	/**
	 *床位名称
	 */
	private String bedName;

	/**
	 *住院号，英文数字
	 */
	private String admissionId;

	/**
	 *病人住院id
	 */
	private Long patientInHospId;

	/**
	 *病人姓名
	 */
	private String name;

	/**
	 *病人性别，0-女,1-男
	 */
	private Byte sex;

	/**
	 *病人年龄
	 */
	private Integer age;

	/**
	 *医生诊断
	 */
	private String diagnosis;

	/**
	 *联系电话
	 */
	private String telphone;

	/**
	 *主管医生
	 */
	private String doctorInChange;

	/**
	 *入院时间（实际入院）
	 */
	private Date inHospitalDate;

	/**
	 *出院时间（实际出院）
	 */
	private Date outHospalDate;

	/**
	 *确认入院时间（317护系统提供）
	 */
	private Date comInHosDate;

	/**
	 *确认出院时间（317护系统提供）
	 */
	private Date comOutHosDate;

	/**
	 *推送课程数
	 */
	private Integer pushNum;

	/**
	 *阅读课程数
	 */
	private Integer readNum;

	/**
	 *有效标识，1-有效，0-无效
	 */
	private Byte validFlag;

	/**
	 *创建时间
	 */
	private Date createTime;

	/**
	 *创建人id
	 */
	private Long createBy;

	/**
	 *更新时间
	 */
	private Date updateTime;

	/**
	 *更新人id
	 */
	private Long updateBy;

	private Long lastPushRecord;		//最近推送记录id


	//以下为查询条件
	private String beginDate;  //yyyy-MM-dd HH:mm:ss
	private String endDate;
	private String nameOrId;

	public String getBeginDate() {
		return beginDate;
	}

	public void setBeginDate(String beginDate) {
		this.beginDate = beginDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getNameOrId() {
		return nameOrId;
	}

	public void setNameOrId(String nameOrId) {
		this.nameOrId = nameOrId;
	}

	public Long getLastPushRecord() {
		return lastPushRecord;
	}

	public void setLastPushRecord(Long lastPushRecord) {
		this.lastPushRecord = lastPushRecord;
	}

	/**
	 *主键，自增 setter方法
	 */
	public void setId(Long id){
		this.id = id;
	}

	/**
	 *主键，自增 getter方法
	 */
	public Long getId(){
		return id;
	}

	/**
	 *医院ID setter方法
	 */
	public void setHospitalId(Long hospitalId){
		this.hospitalId = hospitalId;
	}

	/**
	 *医院ID getter方法
	 */
	public Long getHospitalId(){
		return hospitalId;
	}

	/**
	 *医院名称 setter方法
	 */
	public void setHospitalName(String hospitalName){
		this.hospitalName = hospitalName;
	}

	/**
	 *医院名称 getter方法
	 */
	public String getHospitalName(){
		return hospitalName;
	}

	/**
	 *院区id setter方法
	 */
	public void setHospCompoundId(Long hospCompoundId){
		this.hospCompoundId = hospCompoundId;
	}

	/**
	 *院区id getter方法
	 */
	public Long getHospCompoundId(){
		return hospCompoundId;
	}

	/**
	 *院区名称 setter方法
	 */
	public void setHospCompoundName(String hospCompoundName){
		this.hospCompoundName = hospCompoundName;
	}

	/**
	 *院区名称 getter方法
	 */
	public String getHospCompoundName(){
		return hospCompoundName;
	}

	/**
	 *科室id setter方法
	 */
	public void setDeptId(Long deptId){
		this.deptId = deptId;
	}

	/**
	 *科室id getter方法
	 */
	public Long getDeptId(){
		return deptId;
	}

	/**
	 *科室名称 setter方法
	 */
	public void setDeptName(String deptName){
		this.deptName = deptName;
	}

	/**
	 *科室名称 getter方法
	 */
	public String getDeptName(){
		return deptName;
	}

	/**
	 *病区id setter方法
	 */
	public void setWardId(Long wardId){
		this.wardId = wardId;
	}

	/**
	 *病区id getter方法
	 */
	public Long getWardId(){
		return wardId;
	}

	/**
	 *病区名称 setter方法
	 */
	public void setWardName(String wardName){
		this.wardName = wardName;
	}

	/**
	 *病区名称 getter方法
	 */
	public String getWardName(){
		return wardName;
	}

	/**
	 *床位id setter方法
	 */
	public void setBedId(Long bedId){
		this.bedId = bedId;
	}

	/**
	 *床位id getter方法
	 */
	public Long getBedId(){
		return bedId;
	}

	/**
	 *床位名称 setter方法
	 */
	public void setBedName(String bedName){
		this.bedName = bedName;
	}

	/**
	 *床位名称 getter方法
	 */
	public String getBedName(){
		return bedName;
	}

	/**
	 *住院号，英文数字 setter方法
	 */
	public void setAdmissionId(String admissionId){
		this.admissionId = admissionId;
	}

	/**
	 *住院号，英文数字 getter方法
	 */
	public String getAdmissionId(){
		return admissionId;
	}

	/**
	 *病人住院id setter方法
	 */
	public void setPatientInHospId(Long patientInHospId){
		this.patientInHospId = patientInHospId;
	}

	/**
	 *病人住院id getter方法
	 */
	public Long getPatientInHospId(){
		return patientInHospId;
	}

	/**
	 *病人姓名 setter方法
	 */
	public void setName(String name){
		this.name = name;
	}

	/**
	 *病人姓名 getter方法
	 */
	public String getName(){
		return name;
	}

	/**
	 *病人性别，0-女,1-男 setter方法
	 */
	public void setSex(Byte sex){
		this.sex = sex;
	}

	/**
	 *病人性别，0-女,1-男 getter方法
	 */
	public Byte getSex(){
		return sex;
	}

	/**
	 *病人年龄 setter方法
	 */
	public void setAge(Integer age){
		this.age = age;
	}

	/**
	 *病人年龄 getter方法
	 */
	public Integer getAge(){
		return age;
	}

	/**
	 *医生诊断 setter方法
	 */
	public void setDiagnosis(String diagnosis){
		this.diagnosis = diagnosis;
	}

	/**
	 *医生诊断 getter方法
	 */
	public String getDiagnosis(){
		return diagnosis;
	}

	/**
	 *联系电话 setter方法
	 */
	public void setTelphone(String telphone){
		this.telphone = telphone;
	}

	/**
	 *联系电话 getter方法
	 */
	public String getTelphone(){
		return telphone;
	}

	/**
	 *主管医生 setter方法
	 */
	public void setDoctorInChange(String doctorInChange){
		this.doctorInChange = doctorInChange;
	}

	/**
	 *主管医生 getter方法
	 */
	public String getDoctorInChange(){
		return doctorInChange;
	}

	/**
	 *入院时间（实际入院） setter方法
	 */
	public void setInHospitalDate(Date inHospitalDate){
		this.inHospitalDate = inHospitalDate;
	}

	/**
	 *入院时间（实际入院） getter方法
	 */
	public Date getInHospitalDate(){
		return inHospitalDate;
	}

	/**
	 *出院时间（实际出院） setter方法
	 */
	public void setOutHospalDate(Date outHospalDate){
		this.outHospalDate = outHospalDate;
	}

	/**
	 *出院时间（实际出院） getter方法
	 */
	public Date getOutHospalDate(){
		return outHospalDate;
	}

	/**
	 *确认入院时间（317护系统提供） setter方法
	 */
	public void setComInHosDate(Date comInHosDate){
		this.comInHosDate = comInHosDate;
	}

	/**
	 *确认入院时间（317护系统提供） getter方法
	 */
	public Date getComInHosDate(){
		return comInHosDate;
	}

	/**
	 *确认出院时间（317护系统提供） setter方法
	 */
	public void setComOutHosDate(Date comOutHosDate){
		this.comOutHosDate = comOutHosDate;
	}

	/**
	 *确认出院时间（317护系统提供） getter方法
	 */
	public Date getComOutHosDate(){
		return comOutHosDate;
	}

	/**
	 *推送课程数 setter方法
	 */
	public void setPushNum(Integer pushNum){
		this.pushNum = pushNum;
	}

	/**
	 *推送课程数 getter方法
	 */
	public Integer getPushNum(){
		return pushNum;
	}

	/**
	 *阅读课程数 setter方法
	 */
	public void setReadNum(Integer readNum){
		this.readNum = readNum;
	}

	/**
	 *阅读课程数 getter方法
	 */
	public Integer getReadNum(){
		return readNum;
	}

	/**
	 *有效标识，1-有效，0-无效 setter方法
	 */
	public void setValidFlag(Byte validFlag){
		this.validFlag = validFlag;
	}

	/**
	 *有效标识，1-有效，0-无效 getter方法
	 */
	public Byte getValidFlag(){
		return validFlag;
	}

	/**
	 *创建时间 setter方法
	 */
	public void setCreateTime(Date createTime){
		this.createTime = createTime;
	}

	/**
	 *创建时间 getter方法
	 */
	public Date getCreateTime(){
		return createTime;
	}

	/**
	 *创建人id setter方法
	 */
	public void setCreateBy(Long createBy){
		this.createBy = createBy;
	}

	/**
	 *创建人id getter方法
	 */
	public Long getCreateBy(){
		return createBy;
	}

	/**
	 *更新时间 setter方法
	 */
	public void setUpdateTime(Date updateTime){
		this.updateTime = updateTime;
	}

	/**
	 *更新时间 getter方法
	 */
	public Date getUpdateTime(){
		return updateTime;
	}

	/**
	 *更新人id setter方法
	 */
	public void setUpdateBy(Long updateBy){
		this.updateBy = updateBy;
	}

	/**
	 *更新人id getter方法
	 */
	public Long getUpdateBy(){
		return updateBy;
	}



}
