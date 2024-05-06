import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Handle, Position } from "reactflow";

const handleStyle = { left: 10 };

function TextUpdaterNode({ data, isConnectable }) {
  useEffect(() => {
    console.log("dataa", data);
  }, [data]);

  let iconColor;

  // Set icon color based on contentType
  switch (data.contentType) {
    case "email":
      iconColor = "blue";
      break;
    case "wait":
      iconColor = "purple";
      break;
    default:
      iconColor = "black"; // Default color if contentType is not recognized
  }

  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Box borderColor="pink" borderWidth="2px" borderRadius="md" p="10px">
        <Flex alignItems="center">
          {data.icon !== "" && (
            <Box
              mr="5px"
              color={iconColor}
              borderRadius="30%"
              borderColor="pink"
              borderWidth="2px"
              p="5px"
            >
              {data.icon}
            </Box>
          )}

          <Flex flexDirection="column">
            <Text fontWeight={"600"}>{data.label}</Text>
            <Text fontSize={"10px"}>{data.description}</Text>
          </Flex>
        </Flex>
      </Box>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default TextUpdaterNode;
