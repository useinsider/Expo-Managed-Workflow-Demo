import React from "react";

import CustomButton from "@/components/custom-button";

import RNInsider from "react-native-insider";
import ContentOptimizerDataType from 'react-native-insider/src/ContentOptimizerDataType';

function ContentOptimizer() {
  const triggerContentOptimizer = () => {
     // --- CONTENT OPTIMIZER --- //

     // String
     RNInsider.getContentStringWithName(
       'string_variable_name',
       'defaultValue', // Default Value
       ContentOptimizerDataType.Element,
       (contentOptimizerString) => {
         console.log('[INSIDER][getContentStringWithName]: ', contentOptimizerString);
       }
     );

     // Boolean
     RNInsider.getContentBoolWithName(
       'bool_variable_name',
       true, // Default Value
       ContentOptimizerDataType.Element,
       (contentOptimizerBoolean) => {
         console.log('[INSIDER][getContentBoolWithName]: ', contentOptimizerBoolean);
       }
     );

     // Integer
     RNInsider.getContentIntWithName(
       'int_variable_name',
       10, // Default Value
       ContentOptimizerDataType.Element,
       (contentOptimizerInt) => {
         console.log('[INSIDER][getContentIntWithName]: ', contentOptimizerInt);
       }
     );
  }

  const triggerContentOptimizerWithoutCache = () => {
    // --- CONTENT OPTIMIZER WITHOUT CACHE --- //

    // String
    RNInsider.getContentStringWithoutCache(
      'string_variable_name',
      'defaultValue', // Default Value
      ContentOptimizerDataType.Element,
      (contentOptimizerString) => {
        console.log('[INSIDER][getContentStringWithName]: ', contentOptimizerString);
      }
    );

    // Boolean
    RNInsider.getContentBoolWithoutCache(
      'bool_variable_name',
      true, // Default Value
      ContentOptimizerDataType.Element,
      (contentOptimizerBoolean) => {
        console.log('[INSIDER][getContentBoolWithName]: ', contentOptimizerBoolean);
      }
    );

    // Integer
    RNInsider.getContentIntWithoutCache(
      'int_variable_name',
      10, // Default Value
      ContentOptimizerDataType.Element,
      (contentOptimizerInt) => {
        console.log('[INSIDER][getContentIntWithName]: ', contentOptimizerInt);
      }
    );
 }

  return (
    <>
     <CustomButton
        text="Get Variable With Content Optimizer"
        onPress={triggerContentOptimizer}
      />
     <CustomButton
        text="Get Variable With Content Optimizer (Without Cache)"
        onPress={triggerContentOptimizerWithoutCache}
      /> 
    </>
  );
}

export default ContentOptimizer;
