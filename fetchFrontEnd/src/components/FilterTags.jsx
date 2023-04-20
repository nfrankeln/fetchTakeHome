import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"
import useQueryString from "../hooks/queryString";
import { Flex, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
export default function FilterTags(){
    const [queryString, deleteQueryString] = useQueryString();
  
    return (
<>
        <Flex justifyContent={"center"}>
        {queryString.map((query)=> 
        <Tag key={query.key}>
            <TagLabel>{query.key}: {query.value}</TagLabel>
            <TagCloseButton onClick={()=>deleteQueryString(query.key)}></TagCloseButton>
        </Tag>
        )}
        </Flex>
</>



    )
}