import { Grid, Typography } from "@material-ui/core";
import { TreeItem, TreeView } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import SortableTree from "react-sortable-tree";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
export default function EmployeeDetails(props) {

  let { employeeName } = useParams();
  let location = useLocation();
  const [currentLevelSubordinates, setCurrentLevelSubordinates] = useState([]);
  const [nextLevelSubordinates, setNextLevelSubordinates] = useState([]);
  const [allnonDirectSubordinates, setAllnonDirectSubordinates] = useState([]);
  //creating the root element
  const directSubordinatesData = { id: "root", name: `${employeeName}`, children: [] };
  const [treeData, setTreeData] = React.useState([]);
  

  useEffect(() => {
    getDirectSubordinateEmployeeInfo(employeeName);
  }, []);

  

  useEffect(() => {
    if (currentLevelSubordinates.length) {
      currentLevelSubordinates.forEach((item) => {
        getNonDirectSubordinateEmployeeInfo(item);

      });
//Set the next level subordinates as the current level subordinates for computation
      setCurrentLevelSubordinates(nextLevelSubordinates);

      //setting the next level subordinates for the current iteration
      setNextLevelSubordinates([]);

    }
  }, [currentLevelSubordinates]);

  useEffect(() => {
    if (nextLevelSubordinates.length) {
      setAllnonDirectSubordinates([
        ...allnonDirectSubordinates,
        ...nextLevelSubordinates,
      ]);
    
     
    }
  }, [nextLevelSubordinates]);
 



  const getDirectSubordinateEmployeeInfo = async () => {
    let response = await fetch(
      `http://api.additivasia.io/api/v1/assignment/employees/${employeeName}`
    );
    let userInfo = await response.json();
    console.log(userInfo[1]?.["direct-subordinates"]);
    if (userInfo[1]) {
      setCurrentLevelSubordinates(userInfo[1]["direct-subordinates"]);

      userInfo[1]["direct-subordinates"].forEach((item, index) =>
        directSubordinatesData.children.push({ id: index + 1, name: item })
      );
      setTreeData(directSubordinatesData);
    }
  };
  const getNonDirectSubordinateEmployeeInfo = async (item) => {
    //getting
    let response = await fetch(
      `http://api.additivasia.io/api/v1/assignment/employees/${item}`
    );
   

    let userInfo = await response.json();
    console.log(userInfo[1]?.["direct-subordinates"]);
    if (userInfo[1]) {
      setNextLevelSubordinates([...nextLevelSubordinates,...userInfo[1]["direct-subordinates"]]);

    }

  };
  const result = [];
  const renderTree = (nodes) => {
    result.push(nodes.name);
    return (
      <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
    );
  };
  return (
    <>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12}>
          <Typography variant="h4" color="secondary">Employee Details Overview</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" color="secondary">Direct Subordinates</Typography>
        </Grid>
        <Grid item xs={12}>
          {treeData.children ? (
            <TreeView
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpanded={["root"]}
              defaultExpandIcon={<ChevronRightIcon />}
            >
              {renderTree(treeData)}
            </TreeView>
          ) : (
            "None"
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" color="secondary">NonDirect Subordinates</Typography>
        </Grid>
        <Grid item xs={12}>
          {allnonDirectSubordinates.length
            ? [...new Set(allnonDirectSubordinates)].map((item) => {
                return (
                  <>
                    <Typography variant="body1">
                      <h4>{item}</h4>
                    </Typography>
                  </>
                );
              })
            : "None"}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5">Bookmark Link for the employee</Typography>
          <Link to={`/employee/${employeeName}`}>
            {`http:/localhost:3000${location.pathname}`}
          </Link>
        </Grid>
      </Grid>
    </>
  );
}
