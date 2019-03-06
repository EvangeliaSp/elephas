import {
    SearchBox,
    Hits,
    HitsStats,
    RefinementListFilter,
    Pagination,
    ResetFilters,
    MenuFilter,
    SelectedFilters,
    HierarchicalMenuFilter,
    NumericRefinementListFilter,
    SortingSelector,
    SearchkitComponent,
    SearchkitProvider,
    SearchkitManager,
    NoHits,
    RangeFilter,
    InitialLoader,
    ViewSwitcherToggle,
    ViewSwitcherHits,
    Layout, LayoutBody, LayoutResults,
    SideBar, TopBar,
    ActionBar, ActionBarRow
} from "searchkit";
import * as React from "react";
// import 'scss/modules.container.scss';
import '/home/mikaela/elephas/frontend/src/product/filter.scss';
import * as _ from "lodash";
//const BEMBlock = require("bem-cn")
declare var require: any

// import "searchkit/theming/theme.scss";

// import {MovieHitsGridItem, MovieHitsListItem} from "./ResultComponents"
export class App extends React.Component<any, any> {

    searchkit:SearchkitManager

    constructor() {
        super()
        const host = "/product/findBy"
        this.searchkit = new SearchkitManager(host)
        this.searchkit.translateFunction = (key)=> {
            return {"pagination.next":"Next Page", "pagination.previous":"Previous Page"}[key]
        }
    }


    render(){

        return (
            <SearchkitProvider searchkit={this.searchkit}>
                <Layout size="l">
                    <TopBar>
                        <div className="my-logo">Elephas</div>
                        <SearchBox
                            translations={{"searchbox.placeholder":"search products"}}
                            queryOptions={{"minimum_should_match":"70%"}}
                            autofocus={true}
                            searchOnChange={true}
                            queryFields={["actors^1","type^2","languages","title^5", "genres^2", "plot"]}/>
                    </TopBar>

                    <LayoutBody>

                        <SideBar>
                            <RangeFilter min={0} max={100} field="metaScore" id="metascore" title="Metascore" showHistogram={true}/>
                            <RangeFilter min={0} max={10} field="imdbRating" id="imdbRating" title="IMDB Rating" showHistogram={true}/>
                            <RefinementListFilter id="products" title="Products" field="products.raw" operator="OR" size={10}/>
                        </SideBar>

                        <LayoutResults>

                            <ActionBar>

                                <ActionBarRow>
                                    <HitsStats translations={{
                                        "hitstats.results_found":"{hitCount} results found"
                                    }}/>
                                    <ViewSwitcherToggle/>
                                    {/*<SortingSelector options={[*/}
                                        {/*{label:"Relevance", field:"_score", order:"desc",defaultOption:true},*/}
                                        {/*{label:"Latest Releases", field:"released", order:"desc"},*/}
                                        {/*{label:"Earliest Releases", field:"released", order:"asc"}*/}
                                    {/*]}/>*/}
                                </ActionBarRow>
                                <ActionBarRow>
                                    <SelectedFilters/>
                                    <ResetFilters/>
                                </ActionBarRow>

                            </ActionBar>

                            {/*<ViewSwitcherHits*/}
                                {/*hitsPerPage={12} highlightFields={["title","plot"]}*/}
                                {/*sourceFilter={["plot", "title", "poster", "imdbId", "imdbRating", "year"]}*/}
                                {/*hitComponents = {[*/}
                                    {/*{key:"grid", title:"Grid", itemComponent:MovieHitsGridItem, defaultOption:true},*/}
                                    {/*{key:"list", title:"List", itemComponent:MovieHitsListItem}*/}
                                {/*]}*/}
                                {/*scrollTo="body"*/}
                            {/*/>*/}

                            <NoHits suggestionsField={"title"}/>
                            <InitialLoader/>
                            <Pagination showNumbers={true}/>
                        </LayoutResults>
                    </LayoutBody>
                </Layout>
            </SearchkitProvider>
        )}

}

export default App