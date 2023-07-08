

import React from 'react';
import { useRouter } from 'next/router';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const AdvancedSearch = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitForm = (data) => {
    let queryString = 'searchBy=true';

    if (data.geoLocation) {
      queryString += `&geoLocation=${data.geoLocation}`;
    }

    if (data.medium) {
      queryString += `&medium=${data.medium}`;
    }

    queryString += `&isOnView=${data.isOnView || false}`;
    queryString += `&isHighlight=${data.isHighlight || false}`;
    queryString += `&q=${data.q}`;

    router.push(`/artwork?${queryString}`);
  };

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Search Query</Form.Label>
            <Form.Control type="text" 
                          placeholder="" 
                          name="q" 
                          {...register('q', { required: true })} />
            {errors.q && <Form.Text className="text-danger">This field is required.</Form.Text>}
          </Form.Group>
        </Col>
      

      <Row>
         <Col md={4}>
           <Form.Label>Search By</Form.Label>
           <Form.Select name="searchBy" className="mb-3" defaultValue="title" {...register('searchBy')}>
            
             <option value="title">Title</option>
             <option value="tags">Tags</option>
             <option value="artistOrCulture">Artist or Culture</option>
           </Form.Select>
      </Col>

      </Row>
      
       <Col md={4}>
           <Form.Group className="mb-3">
             
             <Form.Control type="text" placeholder="" name="geoLocation" {...register('geoLocation')} />
           
             <Form.Text className="text-muted">
                Case Sensitive String (e.g., Case Sensitive String (ie &quot;Europe&quot;,&quot;France&quot;, &quot;Paris&quot;, 
                                                                       &quot;Sculpture&quot;,
                                                                       &quot;Textiles&quot;, etc.), with
                   multiple values separated by the | operator
            </Form.Text>
           </Form.Group>
         </Col>

       </Row>

       <Row>
         <Col>
         <Form.Check type="checkbox" label="Highlighted" name="isHighlight" {...register('isHighlight')}  />
         <Form.Check type="checkbox" label="Currently on View" name="isOnView" {...register('isOnView')} />

         </Col>
       </Row>

       <Row>
         <Col>
           <br />
           <Button variant="primary" type="submit">
             Submit
           </Button>
         </Col>
       </Row>
     </Form>

  // <div>test search page</div>

  );
};

export default AdvancedSearch;
