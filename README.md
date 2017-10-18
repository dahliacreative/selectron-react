# Selectron React
### A *simple* select replacement component built with & for React.Js

## Installation
```npm install selectron-react``` 
or  
```yarn add selectron-react```

## Usage
```
<Selectron
        options={[{
            value: 'England',
            label: 'England'
        },{
            value: 'Wales',
            label: 'Wales'
        },{
            value: 'Scotland,
            label: 'Scotland'
        },{
            value: 'Northern Ireland',
            label: 'Northern Ireland'
        }]}
        onChange={(value) => {this.setState({value})}}
        value={this.state.value}/>
```

## Options
| Prop        | Type         | Required | Default               | Description                                                                                         |
|-------------|--------------|----------|-----------------------|-----------------------------------------------------------------------------------------------------|
| options     | array        | Yes      | []                    | an array of option objects, requires value and label params                                         |
| value       | object/array | No       | null                  | an option object / array of option objects, requires value and labelparams                          |
| onChange    | function     | Yes      | () => {}              | a function to be called when the select changes, recieves value as param                            |
| onSearch    | function     | No       |                       | a function to be called when the user searches, recieves term as param. used for ajaxing in options |
| multi       | bool         | No       | false                 | allow multiple options                                                                              |
| placeholder | string       | No       | Please select...      | placeholder to display                                                                              |
| clearable   | bool         | No       | true                  | allows user to clear value once an option is selected                                               |
| searchable  | bool         | No       | true                  | allows user to filter the options list                                                              |
| required    | bool         | No       | false                 | adds HTML5 required attribute to hidden inputs                                                      |
| name        | string       | No       | selectron-react-value | HTML name attribute add to hidden fields                                                            |
