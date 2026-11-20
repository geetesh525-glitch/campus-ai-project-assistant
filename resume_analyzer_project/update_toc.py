import docx

doc_path = 'resume_analyzer_project/AI_Resume_Analyzer_Report.docx'
doc = docx.Document(doc_path)

# Correct mapping of TOC paragraphs:
# P38: CHAPTER 1 INTRODUCTION -> 1
# P39: 1.1 Background -> 1
# P40: 1.2 Motivation -> 1
# P41: 1.3 Objectives -> 1
# P42: 1.4 Scope -> 2
# P43: 1.5 Organization -> 2
# P44: CHAPTER 2 PROBLEM DEFINITION -> 3
# P45: 2.1 Problem Statement -> 3
# P46: 2.2 Existing Approaches -> 3
# P47: 2.3 Proposed Solution -> 3
# P48: CHAPTER 3 LITERATURE SURVEY -> 5
# P49: 3.1 Related Work -> 5
# P50: 3.2 Observations and Gap -> 5
# P51: CHAPTER 4 PROJECT DESCRIPTION -> 6
# P52: 4.1 Overview -> 6
# P53: 4.2 System Architecture -> 6
# P54: 4.3 Modules and Features -> 6
# P55: 4.4 Technology Stack -> 8
# P56: CHAPTER 5 REQUIREMENTS -> 9
# P57: 5.1 Functional Requirements -> 9
# P58: 5.2 Non-Functional Requirements -> 10
# P59: 5.3 Hardware and Software Requirements -> 10
# P60: CHAPTER 6 METHODOLOGY -> 11
# P61: 6.1 Development Approach -> 11
# P62: 6.2 Request Processing -> 11
# P63: CHAPTER 7 EXPERIMENTATION -> 12
# P64: 7.1 Experimental Setup -> 12
# P65: 7.2 Test Plan and Test Cases -> 13
# P66: 7.3 Evaluation Criteria -> 14
# P67: CHAPTER 8 RESULTS AND DISCUSSION -> 15
# P68: 8.1 Test Results -> 15
# P69: 8.2 Application Screenshots -> 16
# P70: 8.3 Discussion -> 17
# P71: 8.4 Limitations -> 17
# P72: 8.5 Future Scope -> 18
# P73: CHAPTER 9 DELIVERABLES AND CONCLUSION -> 19
# P74: 9.1 Deliverables -> 19
# P75: 9.2 Conclusion -> 19
# P76: REFERENCES -> 20

# List of figures:
# P80: Figure 2.1 -> 4
# P81: Figure 4.1 -> 6
# P82: Figure 6.1 -> 11
# P83: Figure 8.1 -> 16
# P84: Figure 8.2 -> 16
# P85: Figure 8.3 -> 17

toc_updates = {
    42: '\t2',
    48: '\t5',
    49: '\t5',
    50: '\t5',
    51: '\t6',
    52: '\t6',
    53: '\t6',
    54: '\t6',
    55: '\t8',
    56: '\t9',
    57: '\t9',
    58: '\t10',
    59: '\t10',
    60: '\t11',
    61: '\t11',
    62: '\t11',
    63: '\t12',
    64: '\t12',
    65: '\t13',
    66: '\t14',
    67: '\t15',
    68: '\t15',
    69: '\t16',
    70: '\t17',
    71: '\t17',
    72: '\t18',
    73: '\t19',
    74: '\t19',
    75: '\t19',
    76: '\t20',
    80: '\t4',
    81: '\t6',
    82: '\t11',
    83: '\t16',
    84: '\t16',
    85: '\t17',
}

for p_idx, new_tab_val in toc_updates.items():
    p = doc.paragraphs[p_idx]
    p.runs[-1].text = new_tab_val
    print(f'P[{p_idx}]: {repr(p.text)}')

doc.save(doc_path)
print('Successfully saved updated TOC in DOCX!')
