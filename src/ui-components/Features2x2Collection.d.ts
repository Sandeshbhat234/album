/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { Features2x2Props } from "./Features2x2";
import { CollectionProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type Features2x2CollectionOverridesProps = {
    Features2x2Collection?: PrimitiveOverrideProps<CollectionProps>;
    Features2x2?: Features2x2Props;
} & EscapeHatchProps;
export declare type Features2x2CollectionProps = React.PropsWithChildren<Partial<CollectionProps<any>> & {
    items?: any[];
    overrideItems?: (collectionItem: {
        item: any;
        index: number;
    }) => Features2x2Props;
} & {
    overrides?: Features2x2CollectionOverridesProps | undefined | null;
}>;
export default function Features2x2Collection(props: Features2x2CollectionProps): React.ReactElement;
