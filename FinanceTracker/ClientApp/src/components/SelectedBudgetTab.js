import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


export const SelectedBudgetTab = (props) => {

    const handleChange = (event, newValue) => {
        props.setTabValue(newValue);
    };

    

    return (
        <Box sx={{ width: '100vw' }}>
            <Tabs
                value={props.tabValue}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                textColor="primary"
                indicatorColor="primary"
                aria-label="secondary tabs example"
            >
                <Tab onClick={() => props.setTabValue('one')} value="one" label="Add Purchase"  />
                <Tab onClick={() => props.setTabValue('two')} value="two" label="Manage Categories" />
            </Tabs>
        </Box>
    );
}