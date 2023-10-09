import { useEffect, useState } from "react";
import { useList, useTranslate } from "@refinedev/core";
import { Button, Space, Skeleton } from "antd";

import { IBookCategory } from "../../interfaces";

type BookItemProps = {
    value?: string[];
    onChange?: (value: string[]) => void;
};

export const BookCategoryFilter: React.FC<BookItemProps> = ({
    onChange,
    value,
}) => {
    const t = useTranslate();

    const [filterCategories, setFilterCategories] = useState<string[]>(
        value ?? [],
    );

    useEffect(() => {
        if (filterCategories.length > 0) {
            onChange?.(filterCategories);
        }
    }, [filterCategories]);

    const { data: categoryData, isLoading: categoryIsLoading } =
        useList<IBookCategory>({
            resource: "categories",
            config: {
                pagination: { pageSize: 30 },
            },
        });

    const toggleFilterCategory = (clickedCategory: string) => {
        const target = filterCategories.findIndex(
            (category) => category === clickedCategory,
        );

        if (target < 0) {
            setFilterCategories((prevCategories) => {
                return [...prevCategories, clickedCategory];
            });
        } else {
            const copyFilterCategories = [...filterCategories];

            copyFilterCategories.splice(target, 1);

            setFilterCategories(copyFilterCategories);
        }

        onChange?.(filterCategories);
    };

    if (categoryIsLoading) {
        return <Skeleton active paragraph={{ rows: 6 }} />;
    }

    return (
        <Space wrap>
            <Button
                shape="round"
                type={filterCategories.length === 0 ? "primary" : "default"}
                onClick={() => {
                    setFilterCategories([]);
                    onChange?.([]);
                }}
            >
                {t("stores.all")}
            </Button>
            {categoryData?.data.map((category) => (
                <Button
                    key={category.id}
                    shape="round"
                    type={
                        filterCategories.includes(category.id.toString())
                            ? "primary"
                            : "default"
                    }
                    onClick={() => toggleFilterCategory(category.id.toString())}
                >
                    {category.name}
                </Button>
            ))}
        </Space>
    );
};
