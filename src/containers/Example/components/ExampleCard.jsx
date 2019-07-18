import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import DataTable from "../../../shared/components/data_table/DataTable";

const ExampleCard = () => (
  <Col md={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Example title</h5>
          <h5 className="subhead">Example subhead</h5>
        </div>
        <p>Your content here</p>
          <DataTable columns={columns} data={dataArray}/>
      </CardBody>
    </Card>
  </Col>
);

const columns = [
	{ title: "Mas Code", field: "mas_cd", width: '10%', align: "center", headerFilter: "input" },
	{ title: "General Name", field: "mas_cd_nm", width: '10%', align: "center", headerFilter: "input" },
	{ title: "Category Code", field: "cate_cd", headerFilter: "input", visible:false },
	{ title: "Category", field: "cate_cd_nm", width: '10%', align: "center", headerFilter: "input" },
	{ title: "Parent Code", field: "parent_mas_cd", headerFilter: "input", visible:false},
	{ title: "Parent", field: "parent_mas_name", width: '10%', align: "center", headerFilter: "input" },
	{ title: "Process Sequence", field: "processing_seq", width: '10%', align: "center", headerFilter: "input" },
	{ title: "Definition", field: "definition_value", align: "center", width: '10%', headerFilter: "input" },
	{ title: "Virtual(Y/N)", field: "virtual_yn", width: '10%', align: "center", formatter: "tickCross"},
	{ title: "Activive(Y/N)", field: "active_yn", width: '10%', align: "center", formatter: "tickCross"},
	{ title: "Sys Code(Y/N)", field: "sys_code_yn", width: '10%', align: "center", formatter: "tickCross"},
	{ title: "Description", field: "remark", width: '11%', align: "center", headerFilter: "input" },
];
const dataArray = [
	{
		mas_cd: "1",
		mas_cd_nm: "mas_cd_nm",
		cate_cd: "12",
		cate_cd_nm: "red",
		parent_mas_cd: "1234",
		parent_mas_name: "5",
		processing_seq: "243",
		definition_value: "111",
		virtual_yn: "true",
		active_yn: "false",
		sys_code_yn: true,
		remark: 'Hello'
	},
];

export default ExampleCard;
