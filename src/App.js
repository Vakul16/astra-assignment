import React, { useEffect, useState, useMemo } from 'react';
import {
  Container,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap';
import TableContainer from './components/TableContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SelectColumnFilter } from './components/Filter';

const App = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const doFetch = async () => {
      const response = await fetch('https://swapi.dev/api/people/');
      const body = await response.json();
      const details = body.results;
      setData(details);
    };
    doFetch();
  }, []);

  const renderRowSubComponent = (row) => {
    const {
      name: { name },
      details: { homeworld, hair_color, skin_color,eye_color },
      picture,
      cell,
    } = row.original;
    return (
      <Card style={{ width: '18rem', margin: '0 auto' }}>
        <CardImg top src={picture.large} alt='Card image cap' />
        <CardBody>
          <CardTitle>
            <strong>{`${name}`} </strong>
          </CardTitle>
          <CardText>
            <strong>Birth Year</strong>: {cell} <br />
            <strong>Body Details</strong>{' '}
            {`${hair_color} - ${skin_color} - ${eye_color} - ${homeworld}`}
          </CardText>
        </CardBody>
      </Card>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: () => null,
        id: 'expander',
        Cell: ({ row, }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? '👇' : '👉'}
          </span>
        ),
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Height',
        accessor: 'height',
      },
      {
        Header: 'Mass',
        accessor: 'mass',
      },
      {
        Header: 'Gender',
        accessor: 'gender',
      },
      {
        Header: 'Homeworld',
        accessor: 'homeworld',
      },


      // Details of people will be displayed in cards when we will expand the row....


      // {
      //   Header: 'Details',
      //   accessor: (values) => {
      //     const { gender, birth_year } = values.details.results;
      //     const first = gender;
      //     const second = birth_year;
      //     return first + '/' + second;
      //   },
      //   disableSortBy: true,
      //   Filter: SelectColumnFilter,
      //   filter: 'equals',
      //   Cell: ({ cell }) => {
      //     const { value } = cell;

      //     const pickEmoji = (value) => {
      //       let first = value[0];
      //       let second = value[1];
      //       const options = [<i class="fa fa-android" aria-hidden="true"></i>, <i class="fas fa-user-circle"></i>, <i class="fas fa-question"></i>, <i class="fas fa-exclamation-circle"></i>];
      //       let string = first === 'male' ? <i class="fa fa-android" aria-hidden="true"></i> : <i class="fas fa-user-circle"></i>;
      //       string = second === 'birth_year' ? string : false;
      //       return options[string];
      //     };

      //     return (
      //       <div style={{ textAlign: 'center', fontSize: 18 }}>
      //         {pickEmoji(value)}
      //       </div>
      //     );
      //   },
      // },
    ],
    []
  );

  return (
    <Container style={{ marginTop: 100 }}>
      <TableContainer
        columns={columns}
        data={data}
        renderRowSubComponent={renderRowSubComponent}
      />
    </Container>
  );
};

export default App;