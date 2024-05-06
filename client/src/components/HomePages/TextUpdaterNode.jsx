

// const TextUpdaterNode = ({ data }) => {
//   return (
//     <div>
//       {data.icon} 
//       <div>{data.label}</div> 
//     </div>
//   );
// };

// export default TextUpdaterNode;


import { Box, Flex } from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

function TextUpdaterNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  useEffect(() => {
    console.log("dataa",data)
  },[data])

  let iconColor;
  
  // Set icon color based on contentType
  switch (data.contentType) {
    case 'email':
      iconColor = 'blue';
      break;
    case 'wait':
      iconColor = 'purple';
      break;
    default:
      iconColor = 'black'; // Default color if contentType is not recognized
  }

 

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <Box borderColor="pink" borderWidth="2px" borderRadius="md" p="10px">
      <Flex alignItems="center" >
      <Box mr="5px" color={iconColor} borderRadius={"30%"} borderColor="pink" borderWidth="2px" p="5px">{data.icon}</Box> 
      <Flex>{data.label}</Flex>
    </Flex>
    </Box>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      />
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
    </div>

  );
}

export default TextUpdaterNode;
