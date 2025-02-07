
import { useState } from "react";
import { debounce } from "../utils/debounce";

export const useSearch = (data: { name: string; avatar: string }[]) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredResults, setFilteredResults] = useState(data);

    const handleSearch = debounce((query: string) => {
        if (query.trim() === "") {
            setFilteredResults(data);
        } else {
            setFilteredResults(
                data.filter((item) =>
                    item.name.toLowerCase().includes(query.toLowerCase())
                )
            );
        }
    }, 300);

    const onChangeText = (text: string) => {
        setSearchQuery(text);
        handleSearch(text);
    };

    return { searchQuery, filteredResults, onChangeText, setSearchQuery };
};
