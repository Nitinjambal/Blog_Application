import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled
} from "@mui/material";
import React from "react";
import { categories } from "../constants/data";


const StyledTable=styled(Table)`
border:1px solid rgb(224,224,224,1);
`

const StyledBtn=styled(Button)`
    margin: 20px;
    width: 85%;
    background: #6495ed;
    color: #fff;
`

function Categories() {
  return (
    <>
      <StyledBtn variant="contained"> Create Blog</StyledBtn>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>All Categories</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories?.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </>
  );
}

export default Categories;
