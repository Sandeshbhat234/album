/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  getOverrideProps,
  getOverridesFromVariants,
  mergeVariantsAndOverrides,
} from "./utils";
import { Text, View } from "@aws-amplify/ui-react";
export default function Notes(props) {
  const { Photo, overrides: overridesProp, ...rest } = props;
  const variants = [
    {
      overrides: {
        "Rectangle 1": {},
        NAME: {},
        Description: {},
        "Rectangle 2": {},
        "Rectangle 3": {},
        Notes: {},
      },
      variantValues: { property1: "Default" },
    },
  ];
  const overrides = mergeVariantsAndOverrides(
    getOverridesFromVariants(variants, props),
    overridesProp || {}
  );
  return (
    <View
      width="725.74px"
      height="200px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "Notes")}
      {...rest}
    >
      <View
        width="725.74px"
        height="200px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="0%"
        bottom="0%"
        left="0%"
        right="0%"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(242,236,236,1)"
        {...getOverrideProps(overrides, "Rectangle 1")}
      ></View>
      <Text
        fontFamily="Inter"
        fontSize="28.80000114440918px"
        fontWeight="400"
        color="rgba(19,20,12,1)"
        lineHeight="34.85454559326172px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="unset"
        height="unset"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="3.5%"
        bottom="79%"
        left="3.86%"
        right="84.57%"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children={Photo?.name}
        {...getOverrideProps(overrides, "NAME")}
      ></Text>
      <Text
        fontFamily="Inter"
        fontSize="28.80000114440918px"
        fontWeight="400"
        color="rgba(92,90,90,1)"
        lineHeight="34.85454559326172px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="707px"
        height="139px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="24%"
        bottom="6.5%"
        left="0.69%"
        right="1.89%"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children={Photo?.description}
        {...getOverrideProps(overrides, "Description")}
      ></Text>
      <View
        width="293px"
        height="36px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="3%"
        bottom="79%"
        left="0.41%"
        right="59.21%"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(225,17,17,0.11)"
        {...getOverrideProps(overrides, "Rectangle 2")}
      ></View>
      <View
        width="707px"
        height="140px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="23.5%"
        bottom="6.5%"
        left="0.69%"
        right="1.89%"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(64,62,147,0.14)"
        {...getOverrideProps(overrides, "Rectangle 3")}
      ></View>
    </View>
  );
}
