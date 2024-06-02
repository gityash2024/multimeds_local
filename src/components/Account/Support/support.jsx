import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const Support = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>FAQs</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>1. Can I know whether your Pharmacy is licensed?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Certainly, we are a licensed pharmacy offering prescription medications online.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading}>2. What are your hours of operation?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Our website is open 24 hours a day, 7 days a week.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography className={classes.heading}>3. What is Multimeds.com’s return and refund policy?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  To know about our Return and Refund policy, please Visit that Page below.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4a-content"
                id="panel4a-header"
              >
                <Typography className={classes.heading}>4. Are medications available at Multimeds.com safe?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Yes. The medications that you purchase at our pharmacy are of the highest quality. The prescription medications we provide are procured from world-class and well-recognised pharmaceutical companies such as GlaxoSmithKline, Pfizer, Wyeth, Merck, Ranbaxy, Dr. Reddy’s, Nicholas Piramal, Sun Pharmacy and other global industry giants. They are manufactured under government supervision, prepackaged in factory-sealed blister packs and untouched by human hands.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel5a-content"
                id="panel5a-header"
              >
                <Typography className={classes.heading}>5. Are there any other hidden charges?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  No. There are no hidden charges in any of our products.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel6a-content"
                id="panel6a-header"
              >
                <Typography className={classes.heading}>6. How long will it take to deliver my order?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Delivery times may vary depending on the delivery location as well as the type of product you order.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel7a-content"
                id="panel7a-header"
              >
                <Typography className={classes.heading}>7. How will I know the status of my order?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  You can check your current order status by simply logging into your account. This lets you track your order in real time.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Support;
